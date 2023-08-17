import { useDispatch, useSelector } from 'react-redux'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const BlogDetails = ({ blog }) => {
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

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes<button onClick={() => dispatch(likeBlog(blog))}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div style={showRemoveButton}>
        <button id='remove-button' onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default BlogDetails