import { useState } from 'react'

import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

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
