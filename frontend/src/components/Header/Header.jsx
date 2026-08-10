import { useState } from "react";
import CineverseLogo from "./CineverseLogo.jsx";
import AuthStatus from "../AuthStatus/AuthStatus.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Category from "../Category/Category.jsx";
import SideMenu from "./SideMenu.jsx";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] h-[60px] xl:h-[80px] bg-black border-b border-[#151515] relative transition-all duration-400 shadow-lg shadow-cyan-300/10">
      <nav className="flex items-center justify-between h-full px-4 xl:px-8">
        {/* Logo bên trái */}
        <Link
          to="/"
          className="shrink-0 flex items-center gap-2.5 no-underline group mr-4 xl:mr-8"
        >
          <CineverseLogo className="w-[36px] xl:w-[42px] h-[36px] xl:h-[42px] transition-all duration-400" />
          <span className="font-extrabold text-lg sm:text-xl tracking-wider font-mono">
            <span className="text-white">CINE</span>
            <span className="text-amber-400">VERSE</span>
          </span>
        </Link>

        {/* Cụm Menu ở giữa - Dành cho màn hình Laptop / PC (lg trở lên) */}
        <div className="hidden lg:flex flex-1 min-w-0 items-center justify-start gap-3 xl:gap-4 2xl:gap-6 whitespace-nowrap text-sm xl:text-base mr-4">
          <Category />
          <Link
            to="/ranking"
            className="inline-block text-white hover:text-cyan-neon hover:scale-105 hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
          >
            Bảng xếp hạng
          </Link>
          <Link
            to="/watchlist"
            className="inline-block text-white hover:text-cyan-neon hover:scale-105 hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
          >
            Danh sách theo dõi
          </Link>
          <Link
            to="/schedule"
            className="inline-block text-white hover:text-cyan-neon hover:scale-105 hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
          >
            Ngày ra mắt
          </Link>
          <Link
            to="/revenue"
            className="inline-block text-white hover:text-cyan-neon hover:scale-105 hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
          >
            Doanh thu hàng đầu
          </Link>
        </div>

        {/* Cụm Tìm kiếm, Auth & Nút Hamburger Menu bên phải */}
        <div className="shrink-0 flex items-center justify-end gap-3 xl:gap-5 ml-auto whitespace-nowrap">
          <SearchBar />
          <AuthStatus />

          {/* Nút Hamburger Menu 3 gạch (Chỉ hiển thị trên Điện thoại & Tablet < lg) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1.5 text-white hover:text-cyan-neon transition-colors cursor-pointer rounded-lg hover:bg-[#1a1a1a]"
            title="Mở Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Lớp nền mờ tối phủ toàn màn hình khi mở Side Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999] lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Bảng Side Menu Drawer trượt từ bên phải sang */}
      <SideMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </header>
  );
}
