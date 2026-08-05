import CineverseLogo from "./CineverseLogo.jsx";
import AuthStatus from "../AuthStatus/AuthStatus.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Category from "../Category/Category.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-[80px] bg-black border-b border-[#151515] relative z-[100]">
      <nav className="flex items-center h-full px-4">
        <Link to="/" className="w-[20%] flex items-center justify-start gap-2.5 no-underline group">
          <CineverseLogo className="w-[42px] h-[42px]" />
          <span className="font-extrabold text-xl tracking-wider font-mono">
            <span className="text-white">CINE</span>
            <span className="text-amber-400">VERSE</span>
          </span>
        </Link>
        <div className="w-[50%] flex items-center gap-[20px]">
          <Category />
          <Link to="/ranking" className="text-white hover:text-amber-400 transition-colors">
            Bảng xếp hạng
          </Link>
          <Link to="/Watchlist" className="text-white hover:text-amber-400 transition-colors">
            Danh sách theo dõi
          </Link>
        </div>
        <div className="w-[30%] flex items-center justify-around">
          <SearchBar />
          <AuthStatus />
        </div>
      </nav>
    </header>
  );
}
