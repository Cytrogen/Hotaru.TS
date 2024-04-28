import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAuthChecked } = useAuth();
  const navigate = useNavigate();

  // Redirect to login page if user is not authenticated.
  // Redirect to home page if user is authenticated.
  useEffect(() => {
    if (!isAuthenticated && isAuthChecked) {
      if (window.location.pathname === "/channels/@me") {
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthenticated, isAuthChecked, navigate]);

  if (!isAuthChecked) return null;

  return (
    <>
      { isAuthenticated ? children : <Navigate to="/login" replace /> }
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navigate to="/channels/@me" replace /> } />
        <Route path="/channels/@me/*" element={ <ProtectedRoute><Home /></ProtectedRoute> } />

        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
