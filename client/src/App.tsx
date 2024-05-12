import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import { ProtectedRoute, UnauthenticatedRoute } from './routes/Auth_Routes'
import { useAppDispatch } from './redux/store'
import { setUserDetails } from './redux/actions/authActions'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    const userId = localStorage.getItem('userId')

    if (token && userId) {
      dispatch(setUserDetails(userId))
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/channels/@me" replace />} />
        <Route
          path="/channels/@me/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthenticatedRoute>
              <Register />
            </UnauthenticatedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
