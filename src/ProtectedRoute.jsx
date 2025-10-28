import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // if not logged in → redirect to home
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // if logged in → allow access
  return children;
};

export default ProtectedRoute;
