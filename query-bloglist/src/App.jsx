import { useEffect } from 'react'
import { useQuery } from 'react-query'

import Menu from './components/Menu'
import BlogView from './components/BlogView'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AccountsTable from './components/AccountsTable'
import AccountDetails from './components/AccountDetails'

import { Routes, Route, useMatch } from 'react-router-dom'

import blogService from './services/blogs'
import accountService from './services/users'
import { useLoginDispatch, useLoginValue, setUser } from './contexts/LoginContext'

const App = () => {
  const loginDispatch = useLoginDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      loginDispatch(setUser(user))
    }
  }, [loginDispatch])

  const user = useLoginValue()

  const blogsResult = useQuery('blogs', blogService.getAll)
  const blogs = blogsResult.data

  const accountsResult = useQuery('accounts', accountService.getAll)
  const accounts = accountsResult.data

  const accountMatch = useMatch('/users/:id')
  const account = accountMatch ? accounts.find(u => u.id === accountMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  if (!user) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Menu />
      <Notification />
      <h2>blogs</h2>
      <Routes>
        <Route path='/' element={<BlogView />} />
        <Route path='/blogs/:id' element={<BlogDetails blog={blog} />} />
        <Route path='/users' element={<AccountsTable />} />
        <Route path='/users/:id' element={<AccountDetails account={account} />} />
      </Routes>
    </div>
  )
}

export default App