import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import accountsReducer from './reducers/accountsReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: loginReducer,
    accounts: accountsReducer,
    notification: notificationReducer
  }
})

export default store