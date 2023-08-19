import { Link, useNavigate } from 'react-router-dom'
import { clearUser, useLoginDispatch, useLoginValue } from '../contexts/LoginContext'

const Menu = () => {
  const dispatch = useLoginDispatch()
  const navigate = useNavigate()
  const user = useLoginValue()

  const padding = {
    padding: 4,
    backgroundColor: 'lightgrey'
  }

  const inline = {
    display: 'inline-block',
    paddingLeft: 8,
    paddingRight: 12
  }

  const buttonStyle = {
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '0px',
    color: '#333',
    padding: '2px 4px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s'
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
    navigate('/')
  }

  return(
    <div style={padding}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <div style={inline}>{`${user.name} logged in`}</div>
      <button style={buttonStyle} onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu