import { Link } from "react-router-dom";
import "./AuthStatus.css";

export default function AuthStatus() {
  return (
    <Link to="/login" className="auth-status-container">
      Đăng nhập
    </Link>
  );
}