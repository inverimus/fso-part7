import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import blogService from '../services/blogs'

import { useLoginDispatch } from '../contexts/LoginContext'
import { useNotification } from '../contexts/NotificationContext'


const BlogForm = ({ setVisible }) => {
  const queryClient = useQueryClient()
  const notification = useNotification()
  const loginDispatch = useLoginDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(blog))
    }
  })

  const handleCreateBlog = (event) => {
    event.preventDefault()

    const content = { title: title, author: author, url: url }
    newBlogMutation.mutate(content, {
      onSuccess: (blog) => {
        notification.success(`added blog: '${blog.title}'`, 5)
      },
      onError: (e => {
        console.log(e)
        if (e.response.status === 401) {
          loginDispatch(clearUser())
          notification.error('You have been logged out', 5)
        } else if (e.response.status === 400) {
          notificationDispatch(setErrorNotification(e.response.data.error))
        }
      })
    })

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