import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      const type = action.payload.type
      const message = action.payload.message
      return { type, message }
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, timeout, type = 'success') => {
  return async dispatch => {
    dispatch(addNotification({ type, message }))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export const setErrorNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(addNotification({ type: 'error', message }))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer