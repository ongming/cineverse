import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Route Guard Component: Bảo vệ các trang yêu cầu đăng nhập
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
