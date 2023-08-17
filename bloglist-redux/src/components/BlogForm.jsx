import { useState } from 'react'
import { useDispatch } from 'react-redux'

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
        <div>
          title:
          <input type="text" value={title} onChange={({target}) => setTitle(target.value)} id='title'/>
        </div>
        <div>
          author:
          <input type="text" value={author} onChange={({target}) => setAuthor(target.value)} id='author'/>
        </div>
        <div>
          url:
          <input type="text" value={url} onChange={({target}) => setUrl(target.value)} id='url'/>
        </div>
        <button type="submit" id='create-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm