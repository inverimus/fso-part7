import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification, setErrorNotification } from './notificationReducer'

const initialState = null

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      return user
    },
    clearUser(state, action) {
      return null
    }
  }
})

export const { setUser, clearUser } = loginSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(`${user.name} logged in`, 5))
    } catch(e) {
      dispatch(setErrorNotification('Wrong credentials', 5))
    }
  }
}

export const checkLocalStorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}


export default loginSlice.reducer