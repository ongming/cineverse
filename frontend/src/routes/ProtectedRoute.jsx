import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Route Guard Component: Bảo vệ các trang yêu cầu đăng nhập
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Nếu người dùng CHƯA ĐĂNG NHẬP ➔ Tự động chuyển hướng về trang /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu ĐÃ ĐĂNG NHẬP ➔ Cho phép truy cập nội dung trang
  return children;
}
