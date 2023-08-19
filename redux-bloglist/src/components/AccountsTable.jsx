import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const Account = ({ account }) => {
  return (
    <tr>
      <td><Link to={`/users/${account.id}`}>{account.name}</Link></td>
      <td>{account.blogs.length}</td>
    </tr>
)}

const AccountsTable = () => {
  const accounts = useSelector(state => state.accounts)

  return (
  <div>
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map(u => <Account key={u.id} account={u} />)}
      </tbody>
    </table>
  </div>
  )
}

export default AccountsTable