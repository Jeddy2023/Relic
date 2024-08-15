import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../hooks/userContext'

const AuthProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, loading  } = useContext(UserContext)

  if (!loading && !accessToken) {
    return <Navigate to={"/auth/login"} replace/>
  }
  return children
}

export default AuthProtectedRoute
