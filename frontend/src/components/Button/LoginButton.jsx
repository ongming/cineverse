import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

export default function LoginButton() {
  return (
    <Link
      to="/login"
      className={`inline-flex items-center justify-center gap-1.5 px-[18px] py-[8px] bg-gradient-to-r whitespace-nowrap from-amber-400 to-yellow-400 text-black font-bold text-sm rounded-lg shadow-md hover:scale-105 hover:shadow-yellow-500/40 transition-all duration-200 shrink-0 `}
    >
      <LogIn className="w-4 h-4" />
      Đăng nhập
    </Link>
  );
}
