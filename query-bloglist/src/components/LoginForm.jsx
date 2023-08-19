import { useState } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setUser, useLoginDispatch } from '../contexts/LoginContext'
import { useNotification } from '../contexts/NotificationContext'

const LoginForm = () => {
  const loginDispatch = useLoginDispatch()
  const notification = useNotification()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      loginDispatch(setUser(user))
      notification.success(`${user.name} logged in`, 5)
      setUsername('')
      setPassword('')
    } catch(e) {
      console.log(e)
      notification.error('Wrong credentials', 5)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input 
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input 
          type="password" 
          value={password} 
          name="Password" 
          id="password" 
          onChange={({target}) => setPassword(target.value)} 
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

export default LoginForm
