import { useState } from "react";
import { Link } from "react-router-dom";
import { useTrailerDetail } from "../../hooks/data/useTrailerDetail.js";
import LoadingState from "../../components/Common/LoadingState.jsx";
import ErrorState from "../../components/Common/ErrorState.jsx";
import TrailerVideo from "./trailerVideo.jsx";
import YouMightAlsoLike from "./YouMightAlsoLike.jsx";
import TrailerImages from "./TrailerImages.jsx";
import TrailerComments from "./TrailerComments.jsx";
import { formatReleaseDate } from "../../utils/revenueUtils.js";
import {
  Star,
  Play,
  Bookmark,
  Share2,
  ChevronRight,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

export default function TrailerDetail() {
  const {
    movieData: movie,
    isLoading,
    isError,
    ...trailerfeatures
  } = useTrailerDetail();

  // Extract state & business logic from custom hooks
  const {
    isSaved,
    isCastModalOpen,
    setIsCastModalOpen,
    navigate,
    handleToggle,
    isBookmarked,
  } = trailerfeatures;

  const [isTrailerVideoOpen, setIsTrailerVideoOpen] = useState(false);

  // 1. Loading State
  if (isLoading) {
    return <LoadingState message="ĐANG TẢI DỮ LIỆU BỘ PHIM..." />;
  }

  // 2. Error or Not Found State
  if (isError || !movie) {
    return (
      <ErrorState
        title="Không tìm thấy dữ liệu bộ phim!"
        message="Bộ phim này không tồn tại hoặc đã bị gỡ khỏi hệ thống."
        backLink="/"
        backText="QUAY LẠI TRANG CHỦ"
      />
    );
  }
  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-8 px-4 sm:px-8 xl:px-16 font-mono text-left">
      {/* Navigation Top Bar */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors no-underline"
        >
          <ArrowLeft className="w-4 h-4" /> QUAY LẠI TRANG CHỦ
        </Link>
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          CHI TIẾT PHIM CINEVERSE
        </span>
      </div>

      {/* SECTION 1: TOP SECTION (Left: Image Gallery with Drag Gesture, Right: Movie Metadata) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Image Gallery Viewer (7 Cols) */}
        <TrailerImages imageData={movie?.images} />

        {/* Right Column: Movie Meta & Action Buttons (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="flex flex-col gap-4">
            {/* Title & Slogan */}
            <h1 className="text-3xl sm:text-4xl font-black text-white font-mono uppercase tracking-tight mb-1">
              {movie.title}
            </h1>

            {/* Metadata Pills Row (Fix #5: Rating badge primary, release date & runtime plain inline text) */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 bg-amber-400 text-black font-black rounded-md flex items-center gap-1 shadow-md">
                <Star className="w-3.5 h-3.5 fill-black" />
                {movie.vote_average} TMDb
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300 font-medium">
                {formatReleaseDate(movie.release_date)}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300 font-medium">
                {movie.runtime} phút
              </span>
            </div>

            {/* Specs Tags (Fix #4: Neutral outline style for metadata genre tags) */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-gray-400">
              {movie.genres?.map((g) => (
                <span
                  key={g.name}
                  className="px-3 py-1.5 bg-transparent border border-white/20 rounded-md text-gray-300 font-bold"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Description Synopsis */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono mb-6">
              {movie.overview || "Chưa có mô tả chi tiết về bộ phim này."}
            </p>
          </div>

          {/* Primary Action Buttons Bar (Fix #4: Cyan reserved ONLY for primary CTA) */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            {/* WATCH NOW / TRAILER Button */}
            <button
              type="button"
              onClick={() => setIsTrailerVideoOpen(true)}
              className="flex-1 py-3.5 px-6 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-cyan-400/20 active:scale-95"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>XEM TRAILER NGAY</span>
            </button>

            {/* Watchlist Bookmark Button */}
            <button
              type="button"
              onClick={(e) => handleToggle(movie, e)}
              className={`p-3.5 border rounded-xl transition-all cursor-pointer active:scale-95 ${
                isBookmarked(movie.id)
                  ? "bg-amber-400 border-amber-400 text-black shadow-md"
                  : "bg-[#141722] border-[#23283a] text-gray-300 hover:text-white hover:border-amber-400"
              }`}
              title="Thêm vào danh sách theo dõi"
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </button>

            {/* Share Button */}
            <a
              href={
                movie.imdb_id
                  ? `https://www.imdb.com/title/${movie.imdb_id}`
                  : `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-amber-400 text-black border border-[#23283a] hover:border-amber-400 font-black rounded-xl transition-all cursor-pointer no-underline inline-flex items-center justify-center font-mono"
              title="Xem trên IMDb"
            >
              IMDb
            </a>
          </div>
        </div>
      </div>

      {/* DIVIDER LINE */}
      <hr className="max-w-7xl mx-auto border-white/10 mb-12" />

      {/* SECTION 2: MIDDLE SECTION (Fix #1: Borderless unified area with vertical divider between Cast/Crew & Commercial Metrics) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 relative">
        {/* Left Column: Top Cast & Crew (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col items-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white font-mono uppercase tracking-wide">
              DÀN DIỄN VIÊN & ĐẠO DIỄN
            </h2>
            <Link
              to={`/trailer/${movie.id}/cast`}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer uppercase font-bold no-underline"
            >
              XEM TẤT CẢ
            </Link>
          </div>

          {/* (Fix #2: Compact row layout for 1 or many people, left-aligned) */}
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-6">
            {/* Director Unit */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-amber-400/50 group-hover:border-amber-400 transition-all p-0.5 shrink-0">
                <img
                  src={movie.director_path}
                  alt={movie.director_name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col items-center font-mono text-center">
                <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  {movie.director_name}
                </h4>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mt-0.5">
                  ĐẠO DIỄN
                </span>
              </div>
            </div>
            {/* Cast Units */}
            {movie.cast_members?.slice(0, 7).map((castMember, index) => (
              <div
                key={castMember.name}
                onClick={() => navigate(`/actors/${castMember.id}`)}
                className={`flex flex-col items-center gap-3 group hover:scale-110 transition-transform duration-300 cursor-pointer ${index > 2 ? "hidden md:flex" : ""}`}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border border-amber-400/50 group-hover:border-amber-400 transition-all p-0.5 shrink-0">
                  <img
                    src={castMember.profile_path}
                    alt={castMember.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center  text-center font-mono ">
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    {castMember.name}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                    {castMember.character_name || "DIỄN VIÊN"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Divider Line for Desktop (Fix #1) */}
        <div className="hidden lg:block absolute left-[58.33%] top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

        {/* Right Column: Commercial Metrics & Rate Widget (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:pl-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                CHỈ SỐ THƯƠNG MẠI & DOANH THU
              </h3>
            </div>

            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs text-gray-400">Kinh Phí Đầu Tư</span>
                <span className="text-sm font-bold text-white">
                  {movie.budget ? `${movie.budget.toLocaleString()}` : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs text-gray-400">Tổng Doanh Thu</span>
                <span className="text-sm font-bold text-amber-400">
                  {movie.revenue
                    ? `  ${movie.revenue.toLocaleString()}`
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-400">
                  Tỷ Lệ ROI Ước Tính
                </span>
                <span
                  className={`text-base font-black ${movie.roi < 0 ? "text-red-400" : "text-emerald-400"}`}
                >
                  {movie.roi < 0 ? `${movie.roi}%` : `+${movie.roi}%`}
                </span>
              </div>
            </div>
          </div>

          {/* Rate Movie Widget */}
          <div className="border border-white/10 hover:border-amber-400/50 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-400/10 rounded-xl text-amber-400">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase">
                  Đánh Giá Bộ Phim Này
                </h4>
                <span className="text-[10px] font-mono text-gray-400">
                  Ý KIẾN CỦA BẠN RẤT QUAN TRỌNG
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>

      {/* DIVIDER LINE */}
      <hr className="max-w-7xl mx-auto border-white/10 mb-12" />

      <YouMightAlsoLike trailers={movie.similarMovies} />

      {/* REVIEWS & COMMENTS SECTION */}
      <TrailerComments movieId={movie?.id} />
      {/* FULLSCREEN LIGHTBOX MODAL */}



      {/* CYAN-NEON YOUTUBE-INSPIRED POPUP PLAYER */}
      <TrailerVideo
        isOpen={isTrailerVideoOpen}
        onClose={() => setIsTrailerVideoOpen(false)}
        videoKey={movie?.trailerKey || movie?.trailerUrl || "d9MyW72ELq0"}
        movieTitle={movie?.name}
      />
    </div>
  );
}
