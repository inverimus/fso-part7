import { createContext, useReducer, useContext } from 'react'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
  }
}

const LoginContext = createContext()

export const useLoginValue = () => {
  const value = useContext(LoginContext)
  return value[0]
}

export const useLoginDispatch = () => {
  const value = useContext(LoginContext)
  return value[1]
}

export const setUser = (user) => {
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  return { type: 'SET', payload: user }
}

export const clearUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return { type: 'CLEAR' }
}

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, null)

  return (
    <LoginContext.Provider value={[login, loginDispatch] }>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginContext