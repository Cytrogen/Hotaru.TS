import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import { ProtectedRoute, UnauthenticatedRoute } from './routes/Auth_Routes'

function App() {
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
