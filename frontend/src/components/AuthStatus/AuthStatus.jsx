import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/images/Avatar.png";
import { useAuth } from "../../context/AuthContext.jsx";
import { LogOut, LogIn, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useClickOutside from "../../hooks/ui/HandleClickOutside.js";
import UserInfoModal from "../UserInfoModal/UserInfoModal.jsx";

export default function AuthStatus() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogout = () => {
    logout();
  };



  return (
    <div className="flex items-center shrink-0">
      {user ? (
        <>
          <div
            ref={dropdownRef}
            className="relative flex items-center rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border-[2px] border-amber-400 shrink-0 hover:scale-105 transition-transform bg-[#161822]">
              <img
                className="w-full h-full object-cover block"
                src={user.avatar_url || defaultAvatar}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = defaultAvatar;
                }}
                alt="User Avatar"
              />
            </div>

            <div
              className={`absolute top-full right-0 mt-2 w-[200px] bg-[#1a1a1a]/80 backdrop-blur-md border border-[#363636] rounded-xl shadow-2xl p-2 text-white text-sm z-[1000] ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <ul className="flex flex-col gap-1 list-none p-0 m-0">
                <li
                  className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-[#2b2b2b] hover:text-cyan-neon cursor-pointer transition-colors"
                  onClick={() => setIsUserInfoModalOpen(true)}
                >
                  <User className="w-4 h-4 text-cyan-neon shrink-0" />
                  <span>Thông tin cá nhân</span>
                </li>
                <li
                  className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-[#2b2b2b] hover:text-red-400 cursor-pointer transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Đăng xuất</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 🟢 User Info Popup Modal (Unmounts on close to reset state completely!) */}
          {isUserInfoModalOpen && (
            <UserInfoModal
              isOpen={isUserInfoModalOpen}
              onClose={() => setIsUserInfoModalOpen(false)}
              user={user}
            />
          )}
        </>
      ) : (
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 px-[18px] py-[8px] bg-gradient-to-r whitespace-nowrap from-amber-400 to-yellow-400 text-black font-bold text-sm rounded-lg shadow-md hover:scale-105 hover:shadow-yellow-500/40 transition-all duration-200"
        >
          <LogIn className="w-4 h-4" />
          Đăng nhập
        </Link>
      )}
    </div>
  );
}
