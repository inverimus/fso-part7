import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button, Box } from '@mui/material'

import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <Box pb={1}>
          <TextField label="username" value={username} onChange={({target}) => setUsername(target.value)} />
        </Box>
        <Box pb={1}>
          <TextField label="password" value={password} onChange={({target}) => setPassword(target.value)} type="password" />
        </Box>
        <div>
          <Button varient="contained" color="primary" type="submit">login</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
