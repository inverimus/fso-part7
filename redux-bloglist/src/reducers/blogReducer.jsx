import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

import { clearUser } from '../reducers/loginReducer'
import { setNotification, setErrorNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { updateBlog, deleteBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`Added new blog: ${newBlog.title} by ${newBlog.author}`, 5))
    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(clearUser())
        dispatch(setErrorNotification('You have been logged out', 5))
      } else if (e.response.status === 400) {
        dispatch(setErrorNotification(e.response.data.error, 5))
      }
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const updatedBlog = await blogService.update(blog.id, newObject)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
    } catch (e) {
      console.log(e)
      if (e.response.status === 401) {
        if (e.response.data.error.includes('expired')) {
          window.localStorage.removeItem('loggedBlogappUser')
          dispatch(clearUser())
          dispatch(setErrorNotification('You have been logged out', 5))
        } else {
          dispatch(setErrorNotification(e.response.data.error, 5))
        }
      } else if (e.response.status === 400) {
        dispatch(setErrorNotification(e.response.data.error, 5))
      }
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    try {
      const body = { comment: comment }
      console.log(body)
      const updatedBlog = await blogService.comment(blog.id, body)
      dispatch(updateBlog(updatedBlog))
    } catch (e) {
      console.log(e)
    }
  }
}

export default blogSlice.reducer