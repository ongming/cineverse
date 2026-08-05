import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginService } from "../../service/authService.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = loginService(email, password);
    if (!user) {
      alert("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
      return;
    }
    login(user);
    alert("Đăng nhập thành công! Chào mừng bạn.");
    navigate("/");
  };

  return (
    <div className="relative min-h-[calc(100vh-160px)] flex justify-center items-center bg-[#0d0d0d] p-[40px_20px] z-10">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#0d0d0d]/80 pointer-events-none"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-[#12141a]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="p-10">
          <h2 className="text-white text-2xl font-bold text-center mb-7 tracking-tight">Chào mừng quay lại!</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5 text-left">
              <label className="block text-[11px] font-bold text-[#8a90a2] tracking-wider mb-2 uppercase">EMAIL</label>
              <div className="relative flex items-center bg-[#0a0c10]/70 border border-white/12 rounded-lg transition-all focus-within:border-amber-400 focus-within:shadow-[0_0_10px_rgba(255,184,0,0.25)] focus-within:bg-[#0c0e14]/90">
                <span className="px-3.5 text-[#6c7284] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  className="flex-1 py-3.5 pr-3.5 bg-transparent border-none outline-none text-white text-sm placeholder:text-[#4a4f5f]"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-5 text-left">
              <label className="block text-[11px] font-bold text-[#8a90a2] tracking-wider mb-2 uppercase">MẬT KHẨU</label>
              <div className="relative flex items-center bg-[#0a0c10]/70 border border-white/12 rounded-lg transition-all focus-within:border-amber-400 focus-within:shadow-[0_0_10px_rgba(255,184,0,0.25)] focus-within:bg-[#0c0e14]/90">
                <span className="px-3.5 text-[#6c7284] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  className="flex-1 py-3.5 pr-3.5 bg-transparent border-none outline-none text-white text-sm placeholder:text-[#4a4f5f]"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="bg-transparent border-none text-[#6c7284] text-base px-3.5 cursor-pointer transition-colors hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-right -mt-1.5 mb-6">
              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                className="text-[#00e5ff] text-xs font-semibold no-underline hover:underline hover:opacity-80 transition-all"
              >
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 border-none rounded-lg text-black text-sm font-extrabold tracking-widest cursor-pointer transition-all shadow-[0_4px_20px_rgba(255,184,0,0.4)] font-mono hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(255,184,0,0.6)] active:translate-y-0"
            >
              ĐẮNG NHẬP
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="relative text-center my-7 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-white/10">
            <span className="relative bg-[#12141a] px-3 text-[#6c7284] text-[11px] font-bold tracking-wider">HOẶC TIẾP TỤC VỚI</span>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 justify-center mb-6">
            <button className="flex-1 flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5" title="Đăng nhập với Google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
              </svg>
            </button>
          </div>

          {/* Registration Footer Link */}
          <div className="text-center text-xs text-[#8a90a2] mt-4 pt-4 border-t border-white/6">
            <span>Chưa có tài khoản? </span>
            <Link to="/register" className="text-[#00e5ff] font-bold no-underline ml-1 hover:text-amber-400 hover:underline transition-colors">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
