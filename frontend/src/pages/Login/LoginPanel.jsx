import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import CineverseLogo from "../../components/Header/CineverseLogo.jsx";
import useLogin from "../../hooks/auth/useLogin.js";

export default function LoginPanel({ onSwitchToRegister, onSwitchToForgot }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    showPassword,
    setShowPassword,
    isLoading,
    errorMessage,
    loginWithGoogle,
  } = useLogin();

  return (
    <div className="max-w-md w-full mx-auto space-y-6 pt-5 sm:pt-6 font-mono">
      {/* Mobile Logo Header */}
      <div className="flex lg:hidden items-center gap-3 mb-8">
        <Link
          to="/"
          className="shrink-0 flex items-center gap-2.5 no-underline group"
        >
          <CineverseLogo className="w-8 h-8" />
          <span className="font-extrabold text-base tracking-wider font-mono">
            <span className="text-white">CINE</span>
            <span className="text-amber-400">VERSE</span>
          </span>
        </Link>
      </div>

      {/* Form Title */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white uppercase mb-2">
          CHÀO MỪNG QUAY LẠI!
        </h2>
        <p className="text-xs text-gray-400">
          Vui lòng nhập thông tin tài khoản của bạn để tiếp tục.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field - Underline Style */}
        <div>
          <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1.5">
            EMAIL TRUY CẬP
          </label>
          <div className="relative flex items-center border-b border-white/20 focus-within:border-amber-400 py-2.5 transition-colors">
            <Mail className="w-5 h-5 text-white shrink-0 mr-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nhap.email@domain.com"
              required
              className="w-full bg-transparent text-white text-sm font-mono placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Password Field - Underline Style */}
        <div>
          <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1.5">
            MẬT KHẨU
          </label>
          <div className="relative flex items-center border-b border-white/20 focus-within:border-amber-400 py-2.5 transition-colors">
            <Lock className="w-5 h-5 text-white shrink-0 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-transparent text-white text-sm font-mono placeholder-gray-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right pt-1">
          <button
            type="button"
            onClick={onSwitchToForgot}
            className="text-xs font-mono text-cyan-400 hover:underline transition-all cursor-pointer"
          >
            Quên mật khẩu?
          </button>
        </div>

        {/* Error Message Feedback Banner */}
        {errorMessage && (
          <p className="text-xs text-red-400 font-bold text-center bg-red-500/10 border border-red-500/20 py-2 rounded-md">
            {errorMessage}
          </p>
        )}

        {/* Primary Action Button */}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-black font-bold text-sm tracking-wider uppercase rounded-lg transition-all disabled:opacity-50"
        >
          {isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP NGAY"}
        </button>
      </form>

      {/* Social Divider */}
      <div className="relative text-center my-8">
        <hr className="absolute top-1/2 left-0 right-0 w-1/4 sm:w-1/3 border-white/10" />
        <span className="px-4 text-[10px] text-gray-500 uppercase tracking-widest">
          HOẶC TIẾP TỤC VỚI
        </span>
        <hr className="absolute top-1/2 right-0 w-1/4 sm:w-1/3 border-white/10" />
      </div>

      {/* Google Social Button */}

      {/* Google Social Button */}
      <button
        type="button"
        onClick={loginWithGoogle}
        className="w-full flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg text-xs text-white transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 24 24">
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
        TIẾP TỤC VỚI GOOGLE
      </button>

      {/* Registration Mirror Footer Link */}
      <p className="text-center text-xs text-gray-400 mt-8">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-cyan-400 font-bold hover:underline ml-1"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
}
