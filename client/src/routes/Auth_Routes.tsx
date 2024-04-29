import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'

interface RouteProps {
  children: React.ReactNode
}

/**
 * Redirect to login page if user is not authenticated.
 *
 * @param children
 * @constructor
 */
export const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { isAuthenticated, isAuthChecked } = useAuth()
  const navigate = useNavigate()

  // Redirect to login page if user is not authenticated.
  // Redirect to home page if user is authenticated.
  useEffect(() => {
    if (!isAuthenticated && isAuthChecked) {
      if (window.location.pathname === '/channels/@me') {
        navigate('/login', { replace: true })
      }
    }
  }, [isAuthenticated, isAuthChecked, navigate])

  if (!isAuthChecked) return null

  return <>{isAuthenticated ? children : <Navigate to="/login" replace />}</>
}

/**
 * Redirect to home page if user is authenticated.
 *
 * @param children
 * @returns
 * @constructor
 */
export const UnauthenticatedRoute: React.FC<RouteProps> = ({ children }) => {
  const { isAuthenticated, isAuthChecked } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && isAuthChecked) {
      navigate('/channels/@me', { replace: true })
    }
  }, [isAuthenticated, isAuthChecked, navigate])

  if (!isAuthChecked) return null

  return <>{!isAuthenticated ? children : <Navigate to="/channels/@me" replace />}</>
}
