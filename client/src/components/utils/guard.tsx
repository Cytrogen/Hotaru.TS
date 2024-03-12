import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Guard component to check if user is authenticated.
 * If user is authenticated, it will render the children component.
 * Otherwise, it will redirect to login page.
 * @constructor
 */
const Guard: React.FC = () => {
  const auth = localStorage.getItem("auth");

  if (auth) return <Outlet/>;
  else return <Navigate to="/login" />;
}

export default Guard;
