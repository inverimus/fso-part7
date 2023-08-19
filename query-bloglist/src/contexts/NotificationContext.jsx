import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
        return action.payload
    case 'CLEAR':
        return null
    default:
        return null
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const value = useContext(NotificationContext)
  return value[0]
}

export const useNotificationDispatch  = () => {
  const value = useContext(NotificationContext)
  return value[1]
}

export const setNotification = (message, type = 'success') => {
  return { type: 'SET', payload: { type, message } }
}

export const setErrorNotification = (message) => {
  return { type: 'SET', payload: { type: 'error', message } }
}

export const clearNotification = () => {
  return { type: 'CLEAR' }
}

export const useNotification = () => {
  const dispatch = useNotificationDispatch()

  const success = (message, timeout) => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }

  const error = (message, timeout) => {
    dispatch(setErrorNotification(message))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }

  return { success, error }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext