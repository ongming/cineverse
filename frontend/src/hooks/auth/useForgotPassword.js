import { useState } from "react";
import {
  sendOTPEmailService,
  resetPasswordService,
} from "../../service/authService.js";

export default function useForgotPassword(onSwitchToLogin, pinLength = 6) {
  const [step, setStep] = useState(1); // 1: Email | 2: OTP | 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(pinLength).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      setIsLoading(true);
      await sendOTPEmailService(email);
      setSuccessMessage("Mã OTP đã được gửi đến email của bạn!");
      setStep(2);
    } catch (err) {
      setErrorMessage(err.message || "Không thể gửi mã OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < pinLength - 1) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTPStep = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < pinLength) {
      setErrorMessage(`Vui lòng nhập đủ ${pinLength} chữ số OTP!`);
      return;
    }
    setErrorMessage("");
    setSuccessMessage("Mã OTP hợp lệ! Vui lòng nhập mật khẩu mới.");
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      setIsLoading(true);
      const fullOtp = otp.join("");
      await resetPasswordService({ email, otp: fullOtp, newPassword });
      setSuccessMessage("Đặt lại mật khẩu thành công! Đang chuyển đến Đăng nhập...");
      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || "Thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  // 4-Tier Password Strength Calculation
  const calculateScore = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(4, Math.max(0, score));
  };

  const score = calculateScore(newPassword);

  const STRENGTH_CONFIG = {
    0: { label: "", color: "bg-gray-700", textColor: "text-gray-400" },
    1: { label: "Rất yếu", color: "bg-red-500", textColor: "text-red-400" },
    2: { label: "Yếu", color: "bg-amber-500", textColor: "text-amber-400" },
    3: { label: "Khá mạnh", color: "bg-emerald-400", textColor: "text-emerald-400" },
    4: { label: "Rất mạnh", color: "bg-cyan-400", textColor: "text-cyan-400" },
  };

  const currentConfig = STRENGTH_CONFIG[score];

  return {
    step,
    setStep,
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
    handleOtpChange,
    handleOtpKeyDown,
    handleVerifyOTPStep,
    handleResetPassword,
  };
}
