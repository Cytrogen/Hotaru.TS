import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Guard component to check if user is authenticated.
 * If user is authenticated, it will render the children component.
 * Otherwise, it will redirect to login page.
 * If user is already authenticated and tries to access login or register page, it will redirect to home page.
 * @constructor
 */
const Guard: React.FC = () => {
  const token = localStorage.getItem("jwtToken");
  const location = useLocation();

  if (token) {
    if (location.pathname === "/login" || location.pathname === "/register") return <Navigate to="/" />;
    return <Outlet />;
  } else {
    if (location.pathname === "/login" || location.pathname === "/register") return <Outlet />;
    return <Navigate to="/login" />;
  }
}

export default Guard;
