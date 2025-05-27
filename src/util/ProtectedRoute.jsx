import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const Navigate = useNavigate();
  const admin = localStorage.getItem("authToken");
  useEffect(() => {
    if (!admin) {
      return Navigate("/admin-login");
    }
  }, [admin]);
  return children;
};

export default ProtectedRoute;