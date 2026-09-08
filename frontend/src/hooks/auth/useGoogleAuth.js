import { useNavigate } from "react-router-dom";
import { googleLoginService } from "../../service/authService";
import { useAuth } from "../../context/AuthContext.jsx";

export default function useGoogleAuth() {
  const { updateAccessToken, setUser } = useAuth();
  const navigate = useNavigate();

  // 1. Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send Google ID Token ("eyJ...") to backend
      const res = await googleLoginService(credentialResponse.credential);
      const userData = res?.data?.user || res?.user;
      const tokenData = res?.data?.token || res?.token;

      if (tokenData) {
        updateAccessToken(tokenData);
        if (userData) setUser(userData);
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi Google Login:", error);
    }
  };

    // 2. Error Handler
  const handleGoogleError = () => {
    console.error("Google Login Failed");
  };

  return { handleGoogleSuccess, handleGoogleError };
}