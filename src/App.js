import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState,useEffect} from 'react'
import About from './components/About'
import {BrowserRouter as Router,Route} from 'react-router-dom'
function App() {
  const [showAddTask,setshowAddTask]=useState(false)
  const [tasks, setTasks] = useState([])

useEffect(() => {
  const getTasks = async () =>{
    const taskfromServer=await fetchTasks()
    setTasks(taskfromServer)
  }
  
  getTasks()
},[])

const fetchTasks= async ()=>{
  const res=await fetch('http://localhost:5000/tasks')
  const data =await res.json()
  return data
}

const fetchTask= async (id)=>{
  const res=await fetch(`http://localhost:5000/tasks/${id}`)
  const data =await res.json()
  return data
}




const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])
}
const deleteTask= async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })
  setTasks(tasks.filter((task)=>task.id!==id))
}

const toggleReminder =  async (id) => {
  const TasktoToggle=await fetchTask(id)
  const updtask={...TasktoToggle,reminder:!TasktoToggle.reminder}
  const res= await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json',
    },
    body:JSON.stringify(updtask)
  })
  const data=await res.json()

  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    )
  )
}


  return (
    <Router>
    <div className="container">
     <Header onClickAdd={()=>{setshowAddTask(!showAddTask)}} show={showAddTask} />
    
     <Route path='/' exact render={(props)=>(
        <>
        {showAddTask && <AddTask onAdd={addTask}/>}
            {
              tasks.length>0 ? (<Tasks tasks={tasks}  onDelete={deleteTask} onToggle={toggleReminder}/>) :('No Tasks')
            }
        </>
     )}/>
     <Route path='/about' component={About}/>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
