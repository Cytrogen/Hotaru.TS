import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, UnauthenticatedRoute } from './routeComponents'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'

/**
 * Routes configuration.
 *
 * @constructor
 */
export const RoutesConfig = () => (
  <>
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
  </>
)
