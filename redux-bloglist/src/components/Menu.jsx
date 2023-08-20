import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Toolbar, Button, Box } from '@mui/material'

import { clearUser } from '../reducers/loginReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

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
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">blogs</Button>
        <Button color="inherit" component={Link} to="/users">users</Button>
        <Button color="inherit" onClick={handleLogout}>logout</Button>
        <Box pl={4}>{user.name}</Box>
      </Toolbar>
    </AppBar>
  )
}

export default Menu