import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Route Guard Component: Bảo vệ các trang yêu cầu đăng nhập
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // 🟢 1. Wait for AuthContext to finish verifying token/localStorage on F5 refresh
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#080808] flex items-center justify-center font-mono text-base text-white">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Authenticating...</span>
        </div>
      </div>
    );
  }

  // 🟢 2. Redirect to /login ONLY IF auth loading is done AND user is null
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
