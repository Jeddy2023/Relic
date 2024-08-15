import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserProvider from './hooks/userContext.tsx'
import { ThemeProvider } from './hooks/ThemeContext.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <App />
        <Toaster/>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
)
