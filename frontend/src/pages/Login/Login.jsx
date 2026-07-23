import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đăng nhập thành công với email: ${email}`);
  };

  return (
    <div className="login-page-container">
      {/* Background layer with blurred movie poster effect */}
      <div className="login-bg-overlay"></div>

      {/* Login Card */}
      <div className="login-card">
        <div className="login-form-content">
          <h2 className="login-title">Chào mừng quay lại!</h2>

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label>EMAIL</label>
              <div className="login-input-wrapper">
                <span className="input-icon">✉</span>
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label>MẬT KHẨU</label>
              <div className="login-input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? "👁" : "👁‍🗨"}
                </button>
              </div>
            </div>

            <div className="forgot-password-container">
              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                className="forgot-link"
              >
                Quên mật khẩu?
              </a>
            </div>

            <button type="submit" className="login-submit-btn">
              ĐẮNG NHẬP
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="login-divider">
            <span>HOẶC TIẾP TỤC VỚI</span>
          </div>

          {/* Social Buttons */}
          <div className="social-buttons-row">
            <button className="social-btn" title="Đăng nhập với Google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
            </button>
          </div>

          {/* Registration Footer Link */}
          <div className="login-register-prompt">
            <span>Chưa có tài khoản? </span>
            <Link to="/register" className="register-link">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
