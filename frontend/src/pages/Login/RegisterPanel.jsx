import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import CineverseLogo from "../../components/Header/CineverseLogo.jsx";
import { useRegister } from "../../hooks/auth/useRegister.js";

export default function RegisterPanel({ onSwitchToLogin }) {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    score,
    currentConfig,
    handleSubmit,
    isLoading,
    errorMessage,
    registerWithGoogle,
  } = useRegister();

  return (
    <div className="max-w-md w-full mx-auto space-y-5 pt-5 sm:pt-4 font-mono">
      {/* Mobile Logo Header */}
      <div className="flex lg:hidden items-center gap-3 mb-6">
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
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white uppercase mb-2">
          TẠO TÀI KHOẢN MỚI
        </h2>
        <p className="text-xs text-gray-400">
          Tham gia Cineverse để lưu phim yêu thích & xem trailer độc quyền.
        </p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Field */}
        <div>
          <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1">
            TÊN NGƯỜI DÙNG
          </label>
          <div className="relative flex items-center border-b border-white/20 focus-within:border-amber-400 py-2 transition-colors">
            <User className="w-4 h-4 text-white shrink-0 mr-3" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên người dùng"
              required
              className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1">
            EMAIL TRUY CẬP
          </label>
          <div className="relative flex items-center border-b border-white/20 focus-within:border-amber-400 py-2 transition-colors">
            <Mail className="w-4 h-4 text-white shrink-0 mr-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nhap.email@domain.com"
              required
              className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1">
            MẬT KHẨU
          </label>
          <div className="relative flex items-center border-b border-white/20 focus-within:border-amber-400 py-2 transition-colors">
            <Lock className="w-4 h-4 text-white shrink-0 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Password Strength Meter (4 Segment Bars with Spring Transition) */}
          {password && (
            <div className="mt-2.5 space-y-1.5">
              <div className="flex gap-1.5 h-1.5 w-full">
                {[1, 2, 3, 4].map((segmentIndex) => {
                  const isFilled = score >= segmentIndex;
                  return (
                    <div
                      key={segmentIndex}
                      className="flex-1 bg-white/10 rounded-full overflow-hidden h-full relative"
                    >
                      <div
                        className={`h-full w-full rounded-full transition-transform duration-300 origin-left ${currentConfig.color}`}
                        style={{
                          transform: isFilled ? "scaleX(1)" : "scaleX(0)",
                          transitionTimingFunction:
                            "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-end text-[10px] font-mono">
                <span
                  className={`font-bold transition-colors duration-300 ${currentConfig.textColor}`}
                >
                  {currentConfig.label}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1">
            XÁC NHẬN MẬT KHẨU
          </label>
          <div className="relative flex items-center border-b border-white/20 focus-within:border-amber-400 py-2 transition-colors">
            <Lock className="w-4 h-4 text-white shrink-0 mr-3" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-[10px] text-red-400 mt-1">
              Mật khẩu xác nhận không khớp
            </p>
          )}
        </div>

        {/* Error Message Feedback */}
        {errorMessage && (
          <p className="text-sm text-red-400 font-bold text-center py-1 rounded-md">
            {errorMessage}
          </p>
        )}

        {/* Primary Action Button */}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-black font-bold text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all mt-4 disabled:opacity-50"
        >
          {isLoading ? "ĐANG XỬ LÝ..." : "TẠO TÀI KHOẢN NGAY"}
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
      <button
        onClick={registerWithGoogle}
        type="button"
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
        ĐĂNG NHẬP BẰNG GOOGLE
      </button>

      {/* Login Mirror Footer Link */}
      <p className="text-center text-xs text-gray-400 mt-6">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-cyan-400 font-bold hover:underline ml-1"
        >
          Đăng nhập ngay
        </button>
      </p>
    </div>
  );
}
