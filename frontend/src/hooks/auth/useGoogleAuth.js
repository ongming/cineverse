import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleLoginService } from "../../service/authService";
import { useAuth } from "../../context/AuthContext.jsx";

export default function useGoogleAuth() {
  const { updateAccessToken, setUser } = useAuth();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const res = await googleLoginService(codeResponse.code);
        const user = res?.data?.user || res?.user;
        const token = res?.data?.token || res?.token;

        if (token) {
          updateAccessToken(token);
          if (user) setUser(user);
          navigate("/");
        }
      } catch (error) {
        console.error("Lỗi xử lý đăng nhập Google Backend:", error);
      }
    },
    onError: (error) => console.error("Đăng nhập với Google thất bại:", error),
  });

  return loginWithGoogle;
}
