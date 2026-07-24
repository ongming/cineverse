import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/images/Avatar.png";
import "./AuthStatus.css";

export default function AuthStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Kiểm tra xem đã có user đăng nhập trong localStorage chưa
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    // 2. Lắng nghe sự kiện authChange để tự cập nhật Header khi vừa đăng nhập/đăng xuất
    window.addEventListener("authChange", checkUser);
    return () => window.removeEventListener("authChange", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <div className="auth-status-container">
      {user ? (
        <div className="user-profile-box">
          {/* CẮT HÌNH TRÒN CHO AVATAR */}
          <div className="user-avatar-circle" title={user.username || user.email}>
            <img src={ user.avatar ? user.avatar : defaultAvatar} alt="User Avatar" />
          </div>
          <span className="user-name">{user.username || "User"}</span>
          <button className="logout-btn" onClick={handleLogout} title="Đăng xuất">
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