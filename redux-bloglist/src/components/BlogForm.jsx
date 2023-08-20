import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Box, Button } from '@mui/material'

import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ setVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreateBlog = (event) => {
    event.preventDefault()

    const content = { title: title, author: author, url: url }
    dispatch(createBlog(content))
    setVisible(false)
    setTitle('')
    setAuthor('')
    setUrl('') 
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <Box pb={1} width={400}><TextField fullWidth label="title" value={title} onChange={({target}) => setTitle(target.value)} /></Box>
        <Box pb={1} width={400}><TextField fullWidth label="author" value={author} onChange={({target}) => setAuthor(target.value)} /></Box>
        <Box pb={1} width={400}><TextField fullWidth label="url" value={url} onChange={({target}) => setUrl(target.value)} /></Box>
        <Button varient="contained" color="success" type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm