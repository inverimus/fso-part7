import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import blogService from '../services/blogs'

import { useLoginDispatch, useLoginValue } from '../contexts/LoginContext'
import { useNotification } from '../contexts/NotificationContext'

const BlogDetails = ({ blog }) => {
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const notification = useNotification()
  const loginDispatch = useLoginDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const user = useLoginValue()

  const blogsResult = useQuery('blogs', blogService.getAll)
  const blogs = blogsResult.data

  const commentBlogMutation = useMutation(blogService.comment, {
    onSuccess: (blog) => {
      queryClient.setQueryData('blogs', blogs.map(b => b.id === blog.id ? blog : b))
    }
  })

  const likeBlogMutation = useMutation(blogService.like, {
    onSuccess: (blog) => {
      queryClient.setQueryData('blogs', blogs.map(b => b.id === blog.id ? blog : b))
    }
  })

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: (blog) => {
      queryClient.setQueryData('blogs', blogs.filter(b => b.id !== blog.id))
    }
  })

  const showRemoveButton = { display: user.username === blog.user.username ? '' : 'none' }

  const handleRemove = async (blog) => {
    if (!window.confirm(`Really remove ${blog.title}?`)) {
      return
    }

    removeBlogMutation.mutate(blog.id, {
      onSuccess: () => {
        navigate('/')
      },
      onError: (e => {
        console.log(e)
        if (e.response.status === 401) {
          if (e.response.data.error.includes('expired')) {
            loginDispatch(clearUser())
            notification.error('You have been logged out', 5)
          } else {
            notification.error(e.response.data.error, 5)
          }
        } else if (e.response.status === 400) {
          notification.error(e.response.data.error, 5)
        }
      })
    })
  }

  const handleComment = async (event) => {
    event.preventDefault()

    commentBlogMutation.mutate({ id: blog.id, comment: { comment } }, {
      onError: (e => {
        notification.error(e.response.data.error, 5)
      })
    })

    setComment('')
  }

  const handleLike = async (blog) => {
    const newObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    likeBlogMutation.mutate({ id: blog.id, newObject })
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes<button onClick={() => handleLike(blog)}>like</button></div>
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