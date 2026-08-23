import { X, User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useUserData } from "../../hooks/data/useUserData.js";

export default function UserInfoModal({ isOpen, onClose, user }) {
  const {
    username,
    setUsername,
    email,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    previewUrl,
    isSaving,
    fileInputRef,
    handleFileChange,
    feedback,
    modalRef,
    handleSave,
    initialLetter,
    defaultAvatar,
  } = useUserData({ isOpen, onClose, user });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Hidden File Input for Image Selection */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Modal Card Box */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#0c0d12] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl text-white font-sans overflow-hidden"
      >
        {/* Top Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Avatar & Header Layout Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b border-white/10 pb-8">
          {/* Avatar Container */}
          <div className="flex flex-col items-center gap-2.5 shrink-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-[#161822] flex items-center justify-center shadow-lg">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={username || "User Avatar"}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = defaultAvatar;
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                  {initialLetter}
                </span> 
              )}
            </div>
            {/* Secondary Change Avatar Text Action */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSaving}
              className="text-xs text-gray-400 hover:text-amber-400 transition-colors font-mono cursor-pointer underline underline-offset-4 disabled:opacity-50"
            >
              Đổi ảnh đại diện
            </button>
          </div>

          {/* Header Title Section */}
          <div className="text-center sm:text-left space-y-1.5 pt-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase font-mono">
              THÔNG TIN TÀI KHOẢN
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-normal">
              Quản lý thông tin cá nhân
            </p>
          </div>
        </div>

        {/* 2. Form Fields Section (Underline Style Inputs) */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
              TÊN NGƯỜI DÙNG
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-0 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên người dùng..."
                className="w-full bg-transparent border-b border-white/20 focus:border-amber-400 text-sm text-white py-2 pl-7 pr-4 focus:outline-none transition-colors font-sans"
              />
            </div>
          </div>

          {/* Email Field (Read Only) */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
              EMAIL
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-0 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                readOnly
                className="w-full bg-transparent border-b border-white/10 text-sm text-gray-400 py-2 pl-7 pr-8 cursor-not-allowed font-sans select-none"
              />
              <CheckCircle className="w-4 h-4 text-gray-500 absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
              MẬT KHẨU MỚI (để trống nếu không đổi)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-0 top-1/2 -translate-y-1/2" />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent border-b border-white/20 focus:border-amber-400 text-sm text-white py-2 pl-7 pr-8 focus:outline-none transition-colors font-sans"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
              XÁC NHẬN MẬT KHẨU MỚI
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-0 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent border-b border-white/20 focus:border-amber-400 text-sm text-white py-2 pl-7 pr-8 focus:outline-none transition-colors font-sans"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Feedback Messages */}
          {feedback?.message && (
            <div
              className={`text-xs font-mono font-bold ${
                feedback.type === "success"
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* 3. Primary Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer active:scale-95 shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving && (
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              )}
              <span>{isSaving ? "ĐANG LƯU..." : "LƯU THAY ĐỔI"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
