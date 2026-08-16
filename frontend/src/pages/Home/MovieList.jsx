// pages/Home/MovieList.jsx
import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useHomeData } from "../../hooks/data/useHomeData.js";
import MovieGrid from "../../components/MovieList/MovieList.jsx";
import { ArrowLeft, Film } from "lucide-react";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx";

export default function MovieListCategoryPage() {
  const { type } = useParams();
  const { data, isLoading, isError, page, setPage } = useHomeData();
  const { nowPlaying, upcoming } = data || {};
  // Determine title and filter movies array based on URL parameter :type
  const { pageTitle, displayMovies } = useMemo(() => {
    if (type === "now-playing") {
      return {
        pageTitle: "DANH SÁCH PHIM ĐANG CHIẾU",
        displayMovies: nowPlaying,
      };
    }
    if (type === "upcoming") {
      return {
        pageTitle: "DANH SÁCH PHIM SẮP CHIẾU",
        displayMovies: upcoming,
      };
    }
    return {
      pageTitle: "KHÔNG TÌM THẤY DANH SÁCH PHIM",
      displayMovies: null,
    };
  }, [type, nowPlaying, upcoming]);

  if (!displayMovies || displayMovies.length === 0) {
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
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 uppercase tracking-widest animate-pulse">
          ĐANG TẢI DANH SÁCH PHIM...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <h2 className="text-lg font-bold text-amber-400">
          Không thể tải dữ liệu danh sách phim!
        </h2>
        <p className="text-xs text-gray-400">
          Vui lòng kiểm tra kết nối và thử lại sau.
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
            Hiển thị {displayMovies.length} bộ phim
          </p>
        </div>
      </div>

      {/* Render full grid catalog using MovieList component */}
      <MovieGrid movies={displayMovies} />
      <PaginationControls
        page={page}
        setPage={setPage}
        hasMore={displayMovies.length < 18}
      />
    </div>
  );
}
