import { Button } from '@mui/material'

const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  const toggleVisibility = () => {
    props.setVisible(!props.visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
      <Button varient="contained" color="primary" onClick={toggleVisibility}>{props.buttonShowLabel}</Button>
      </div>
      <div className='details' style={showWhenVisible}>
        <div>
          {props.children}
          <Button varient="contained" color="error" onClick={toggleVisibility}>{props.buttonHideLabel}</Button>
        </div>
      </div>
    </div>
  )
}

export default Togglable