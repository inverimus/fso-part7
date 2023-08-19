import { useSelector } from 'react-redux'

const Notification = () => {
  const selected = useSelector(state => state.notification)

  if (selected === null) {
    return <div></div>
  }

  const { type, message } = selected

  var color
  switch (type) {
    case 'success':
      color = 'green'
      break
    case 'error':
      color = 'red'
      break
    default:
      color = 'green'
  }

  const style = {
    color: `${color}`,
    fontSize: '20px',
    backgroundColor: 'lightgray',
    border: `4px solid ${color}`,
    borderRadius: '10px',
    padding: '10px',
    paddingTop: '20px'
  }
  
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification