import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/images/Avatar.png";
import { useAuth } from "../../context/AuthContext.jsx";
import { LogOut, LogIn } from "lucide-react";

export default function AuthStatus() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex items-center gap-[10px] bg-white/10 px-3 py-1 rounded-full border border-white/15">
          <div
            className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center shadow-lg border-[1.5px] border-amber-400 shrink-0"
            title={user.username || user.email}
          >
            <img
              className="w-full h-full object-cover block"
              src={user.avatar ? user.avatar : defaultAvatar}
              alt="User Avatar"
            />
          </div>
          <span className="text-white text-sm font-semibold">{user.username || "User"}</span>
          <button
            className="bg-transparent border-none text-zinc-300 hover:text-red-400 text-sm cursor-pointer p-1 rounded transition-transform hover:scale-110 flex items-center justify-center"
            onClick={handleLogout}
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 px-[18px] py-[8px] bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold text-sm rounded-lg shadow-md hover:-translate-y-0.5 hover:shadow-yellow-500/40 transition-all duration-200"
        >
          <LogIn className="w-4 h-4" />
          Đăng nhập
        </Link>
      )}
    </div>
  );
}
