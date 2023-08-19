import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const BlogDetails = ({ blog }) => {
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const showRemoveButton = { display: user.username === blog.user.username ? '' : 'none' }

  const handleRemove = async (blog) => {
    if (!window.confirm(`Really remove ${blog.title}?`)) {
      return
    }

    dispatch(removeBlog(blog))
    navigate('/')
  }

  const handleComment = async (event) => {
    event.preventDefault()

    console.log(comment)
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes<button onClick={() => dispatch(likeBlog(blog))}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div style={showRemoveButton}>
        <button id='remove-button' onClick={() => handleRemove(blog)}>remove</button>
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input type="text" value={comment} onChange={({target}) => setComment(target.value)}></input>
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map(c => <li key={c.id}>{c.text}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails