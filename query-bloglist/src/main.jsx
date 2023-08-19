import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { LoginContextProvider } from './contexts/LoginContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <LoginContextProvider>
      <NotificationContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationContextProvider>
    </LoginContextProvider>
  </QueryClientProvider>
)