import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import CineverseLogo from "../../components/Header/CineverseLogo.jsx";
import PinInput from "../../components/PinInput/PinInput.jsx";
import useForgotPassword from "../../hooks/auth/useForgotPassword.js";

export default function ForgotPasswordPanel({ onSwitchToLogin }) {
  const {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    errorMessage,
    successMessage,
    score,
    currentConfig,
    handleSendOTP,
    handleVerifyOTPStep,
    handleResetPassword,
  } = useForgotPassword(onSwitchToLogin, 6);

  return (
    <div className="max-w-md w-full mx-auto space-y-6 pt-5 sm:pt-6 font-mono">
      {/* Mobile Logo Header */}
      <div className="flex lg:hidden items-center gap-3 mb-6">
        <Link to="/" className="shrink-0 flex items-center gap-2.5 no-underline group">
          <CineverseLogo className="w-8 h-8" />
          <span className="font-extrabold text-base tracking-wider font-mono">
            <span className="text-white">CINE</span>
            <span className="text-amber-400">VERSE</span>
          </span>
        </Link>
      </div>

      {/* Step Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white uppercase mb-2">
          {step === 1 && "QUÊN MẬT KHẨU?"}
          {step === 2 && "NHẬP MÃ PIN / OTP"}
          {step === 3 && "MẬT KHẨU MỚI"}
        </h2>
        <p className="text-xs text-gray-400">
          {step === 1 && "Nhập email đăng ký của bạn để nhận mã OTP khôi phục."}
          {step === 2 && `Mã xác thực 6 chữ số đã được gửi đến ${email}.`}
          {step === 3 && "Nhập mật khẩu mới cho tài khoản Cineverse của bạn."}
        </p>
      </div>

      {/* Alert Messages */}
      {errorMessage && (
        <p className="text-xs text-red-400 font-bold text-center bg-red-500/10 border border-red-500/20 py-2 rounded-md">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="text-xs text-emerald-400 font-bold text-center bg-emerald-500/10 border border-emerald-500/20 py-2 rounded-md flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> {successMessage}
        </p>
      )}

      {/* STEP 1: Enter Email */}
      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-6">
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

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-black font-bold text-sm tracking-wider uppercase rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "ĐANG GỬI MÃ OTP..." : "GỬI MÃ XÁC THỰC (OTP)"}
          </button>
        </form>
      )}

      {/* STEP 2: 6 Single-Character Boxes with Spring Pop Animation */}
      {step === 2 && (
        <form onSubmit={handleVerifyOTPStep} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-4 text-center">
              NHẬP MÃ PIN 6 CHỮ SỐ
            </label>
            
            <PinInput
              length={6}
              value={otp}
              onChange={setOtp}
              onComplete={() => handleVerifyOTPStep()}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-black font-bold text-sm tracking-wider uppercase rounded-lg transition-all cursor-pointer"
          >
            TIẾP TỤC
          </button>
        </form>
      )}

      {/* STEP 3: New Password Inputs */}
      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1">
              MẬT KHẨU MỚI
            </label>
            <div className="relative flex items-center border-b border-white/20 focus-within:border-amber-400 py-2 transition-colors">
              <Lock className="w-4 h-4 text-white shrink-0 mr-3" />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {newPassword && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((segmentIndex) => (
                    <div key={segmentIndex} className="flex-1 bg-white/10 rounded-full overflow-hidden h-full">
                      <div
                        className={`h-full w-full rounded-full transition-transform duration-300 origin-left ${currentConfig.color}`}
                        style={{
                          transform: score >= segmentIndex ? "scaleX(1)" : "scaleX(0)",
                          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 text-right">
                  Độ mạnh: <span className={`font-bold ${currentConfig.textColor}`}>{currentConfig.label}</span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1">
              XÁC NHẬN MẬT KHẨU MỚI
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
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-[10px] text-red-400 mt-1">Mật khẩu xác nhận không khớp</p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-black font-bold text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all mt-4 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "ĐANG ĐẶT LẠI..." : "ĐẶT LẠI MẬT KHẨU"}
          </button>
        </form>
      )}

      {/* Back to Login Footer Link */}
      <p className="text-center text-xs text-gray-400 mt-6">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Đăng nhập
        </button>
      </p>
    </div>
  );
}
