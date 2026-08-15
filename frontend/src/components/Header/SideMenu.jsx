import { Link } from "react-router-dom";
import CineverseLogo from "./CineverseLogo.jsx";
import SideCategory from "../Category/SideCategory.jsx";
import { X } from "lucide-react";

export default function SideMenu({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <div
      className={`fixed top-0 right-0 w-[280px] sm:w-[320px] h-full bg-[#121212] border-l border-[#262626] z-[10000] p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Phần trên Side Menu (Scrollable) */}
      <div className="flex-1 overflow-y-auto pr-1">
        {/* Header của Side Menu (Logo + Nút Đóng X) */}
        <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-6">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 no-underline"
          >
            <CineverseLogo className="w-8 h-8" />
            <span className="font-extrabold text-lg tracking-wider font-mono">
              <span className="text-white">CINE</span>
              <span className="text-amber-400">VERSE</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#222222] rounded-lg transition-colors cursor-pointer"
            title="Đóng Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Danh sách các đường dẫn Navigation */}
        <div className="flex flex-col gap-2 text-base font-medium">
          <SideCategory />
          <Link
            to="/ranking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-cyan-neon py-2.5 px-3 rounded-lg hover:bg-[#1f1f1f] transition-colors"
          >
            Bảng xếp hạng
          </Link>
          <Link
            to="/watchlist"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-cyan-neon py-2.5 px-3 rounded-lg hover:bg-[#1f1f1f] transition-colors"
          >
            Danh sách theo dõi
          </Link>
          <Link
            to="/schedule"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-cyan-neon py-2.5 px-3 rounded-lg hover:bg-[#1f1f1f] transition-colors"
          >
            Ngày ra mắt
          </Link>
          <Link
            to="/revenue"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-cyan-neon py-2.5 px-3 rounded-lg hover:bg-[#1f1f1f] transition-colors"
          >
            Doanh thu hàng đầu
          </Link>
        </div>
      </div>

      {/* Chân Side Menu */}
      <div className="border-t border-[#222222] pt-4 text-xs text-gray-500 text-center font-mono">
        © 2026 CINEVERSE App
      </div>
    </div>
  );
}
