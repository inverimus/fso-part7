import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import store from './store'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Container } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Container>
        <App />
      </Container>
    </BrowserRouter>
  </Provider>
)