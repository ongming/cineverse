// frontend/src/components/Button/GoogleButton.jsx
import { GoogleLogin } from "@react-oauth/google";
import useGoogleAuth from "../../hooks/auth/useGoogleAuth";

export default function GoogleLoginButton() {
  const { handleGoogleSuccess, handleGoogleError } = useGoogleAuth();

  return (
    <div className="relative w-full">
      {/* 1. Custom UI Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg text-xs text-white transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
          <path fill="#FBBC05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
          <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
        </svg>
        <span>TIẾP TỤC VỚI GOOGLE</span>
      </button>

      {/* 2. Invisible Google Overlay */}
      <div className="absolute inset-0 opacity-0 cursor-pointer overflow-hidden flex items-center justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
}