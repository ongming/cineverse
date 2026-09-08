import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import CineverseLogo from "../../components/Header/CineverseLogo.jsx";
import { useRegister } from "../../hooks/auth/useRegister.js";
import GoogleLoginButton from "../../components/Button/GoogleLoginButton.jsx";

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
      <GoogleLoginButton />

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
