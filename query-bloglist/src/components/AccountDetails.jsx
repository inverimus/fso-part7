const AccountDetails = ({ account }) => {
  if (!account) {
    return null
  }

  return (
    <div>
      <h2>{account.name}</h2>
      <b>added blogs</b>
      <ul>
        {account.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default AccountDetails