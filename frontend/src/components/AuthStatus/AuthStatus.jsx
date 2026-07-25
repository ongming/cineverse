import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/images/Avatar.png";
import { useAuth } from "../../context/AuthContext.jsx";
import "./AuthStatus.css";

export default function AuthStatus() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="auth-status-container">
      {user ? (
        <div className="user-profile-box">
          {/* CẮT HÌNH TRÒN CHO AVATAR */}
          <div
            className="user-avatar-circle"
            title={user.username || user.email}
          >
            <img
              src={user.avatar ? user.avatar : defaultAvatar}
              alt="User Avatar"
            />
          </div>
          <span className="user-name">{user.username || "User"}</span>
          <button
            className="logout-btn"
            onClick={handleLogout}
            title="Đăng xuất"
          >
            🚪
          </button>
        </div>
      ) : (
        <Link to="/login" className="auth-status-btn">
          Đăng nhập
        </Link>
      )}
    </div>
  );
}
