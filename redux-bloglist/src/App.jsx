import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Menu from './components/Menu'
import BlogView from './components/BlogView'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AccountsTable from './components/AccountsTable'
import AccountDetails from './components/AccountDetails'

import { Routes, Route, useMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { checkLocalStorage } from './reducers/loginReducer'
import { initializeUsers } from './reducers/accountsReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const accounts = useSelector(state => state.accounts)

  const accountMatch = useMatch('/users/:id')
  const account = accountMatch ? accounts.find(u => u.id === accountMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  useEffect(() => {
    dispatch(checkLocalStorage())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return (
      <div>
        <Notification />
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