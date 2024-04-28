import { useEffect, useState } from 'react'

/**
 * A custom hook that checks if user is authenticated.
 *
 * This hook uses the local storage to check if a JWT token is present.
 * If a token is found, it sets `isAuthenticated` to true, otherwise false.
 *
 * After checking for the token, it sets `isAuthChecked` to true to indicate that the check is complete.
 *
 * @returns An object with two properties:
 * - isAuthenticated: A boolean value indicating if user is authenticated.
 * - isAuthChecked: A boolean value indicating if the authentication check is complete.
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthChecked, setIsAuthChecked] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    setIsAuthChecked(true)
  }, [])

  return { isAuthenticated, isAuthChecked }
}
