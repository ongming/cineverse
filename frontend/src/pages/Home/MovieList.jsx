// pages/Home/MovieList.jsx
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { movies } from "../../data/movies.js";
import MovieGrid from "../../components/MovieList/MovieList.jsx";
import { ArrowLeft, Film } from "lucide-react";

export default function MovieListCategoryPage() {
  const { type } = useParams();

  // Determine title and filter movies array based on URL parameter :type
  const { pageTitle, displayMovies } = useMemo(() => {
    if (type === "now-playing") {
      return {
        pageTitle: "DANH SÁCH PHIM ĐANG CHIẾU",
        displayMovies: movies,
      };
    }
    if (type === "upcoming") {
      return {
        pageTitle: "DANH SÁCH PHIM SẮP CHIẾU",
        displayMovies: movies.slice(2, 8),
      };
    }
    if (type === "top-rated") {
      return {
        pageTitle: "DANH SÁCH PHIM ĐÁNH GIÁ CAO NHẤT",
        displayMovies: [...movies].sort((a, b) => b.rating - a.rating),
      };
    }
    return {
      pageTitle: "KHÔNG TÌM THẤY DANH SÁCH PHIM",
      displayMovies: null,
    };
  }, [type]);

  if(!displayMovies || displayMovies.length === 0) {
    return (
      <div className="px-[clamp(10px,5vw,100px)] pt-8 pb-[50px] bg-[#080808] text-white min-h-screen box-border font-mono text-left">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> QUAY LẠI TRANG CHỦ
          </Link>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-mono uppercase tracking-tight m-0">
          {pageTitle}
        </h1>
        <p className="text-xs text-gray-400 font-mono m-0 mt-1">
          Không có phim nào trong danh sách này.
        </p>
      </div>
    );
  }

  return (
    <div className="px-[clamp(10px,5vw,100px)] pt-8 pb-[50px] bg-[#080808] text-white min-h-screen box-border font-mono text-left">
      {/* Navigation Top Bar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors no-underline"
        >
          <ArrowLeft className="w-4 h-4" /> QUAY LẠI TRANG CHỦ
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-amber-400/10 rounded-xl text-amber-400 border border-amber-400/30">
          <Film className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-mono uppercase tracking-tight m-0">
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-400 font-mono m-0 mt-1">
            Hiển thị {displayMovies.length} bộ phim trong hệ thống CINEVERSE
          </p>
        </div>
      </div>

      {/* Render full grid catalog using MovieList component */}
      <MovieGrid movies={displayMovies} />
    </div>
  );
}
