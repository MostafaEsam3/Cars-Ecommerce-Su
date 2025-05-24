import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectTo = "/admin-login" }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
}

export default ProtectedRoute;
