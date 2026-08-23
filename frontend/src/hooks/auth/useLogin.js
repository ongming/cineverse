import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import useGoogleAuth from "./useGoogleAuth.js";

export default function useLogin() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithGoogle = useGoogleAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      setIsLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message || "Đăng nhập thất bại.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    navigate,
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
  };
}
