import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import useGoogleAuth from "./useGoogleAuth.js";

export function useRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerWithGoogle = useGoogleAuth();
  // 4-Tier Password Strength Calculation (0-4)
  const calculateScore = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(4, Math.max(0, score));
  };

  const score = calculateScore(password);

  const STRENGTH_CONFIG = {
    0: { label: "", color: "bg-gray-700", textColor: "text-gray-400" },
    1: { label: "Rất yếu", color: "bg-red-500", textColor: "text-red-400" },
    2: { label: "Yếu", color: "bg-amber-500", textColor: "text-amber-400" },
    3: {
      label: "Khá mạnh",
      color: "bg-emerald-400",
      textColor: "text-emerald-400",
    },
    4: { label: "Rất mạnh", color: "bg-cyan-400", textColor: "text-cyan-400" },
  };

  const currentConfig = STRENGTH_CONFIG[score];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      setIsLoading(true);
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message || "Đăng ký thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}
