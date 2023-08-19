import { useState } from 'react'

import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogView = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  return (
    <div>
      <Togglable buttonShowLabel='create new blog' buttonHideLabel='cancel' visible={blogFormVisible} setVisible={setBlogFormVisible}>
        <BlogForm setVisible={setBlogFormVisible} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default BlogView