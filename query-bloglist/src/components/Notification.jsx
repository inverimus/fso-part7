import { useNotificationValue } from "../contexts/NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) {
    return <div></div>
  }

  const { type, message } = notification

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