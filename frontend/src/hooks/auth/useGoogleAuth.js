import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginService } from "../../service/authService";

export default function useGoogleAuth() {
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { token } = await googleLoginService(tokenResponse.access_token);
      localStorage.setItem("token", token);
      window.location.href = "/";
    },
    onError: (error) => console.error("Đăng nhập với Google thất bại:", error),
  });
  return loginWithGoogle;
}
