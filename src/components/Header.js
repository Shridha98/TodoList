import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation} from 'react-router-dom'
const Header = ({title,onClickAdd,show}) => {
   const location=useLocation()
    return (
        <header className='header'>
            {/* <h1 style={{color:"red",backgroundColor:"black"}}>{props.title}</h1>
            <h2 style={headingStyle}>{props.data}</h2> */}
            <h1 >{title}</h1>
            {location.pathname==='/' && <Button onClick={onClickAdd} color={show ? 'red': 'green'} text={show ? 'Close': 'Add'}/>}
        </header>
    )
}

// const headingStyle={
//     color:"red",backgroundColor:"black"
// }
Header.defaultProps={
    title:"Task Tracker",
  
}

Header.propTypes={
    title: PropTypes.string.isRequired
}
export default Header