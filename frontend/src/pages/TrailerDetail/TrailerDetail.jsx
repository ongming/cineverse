import { useState } from "react";
import { Link } from "react-router-dom";
import { useTrailerDetail } from "../../hooks/data/useTrailerDetail.js";
import { useMovieReviews } from "../../hooks/data/useMovieReviews.js";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import CastModal from "../../components/CastModal/CastModal.jsx";
import TrailerVideo from "./trailerVideo.jsx";
import TrailerImages from "./TrailerImages.jsx";
import { formatReleaseDate } from "../../utils/revenueUtils.js";
import {
  Star,
  Play,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  TrendingUp,
  Award,
  ThumbsUp,
  MessageSquare,
  Flag,
  Send,
  ArrowLeft,
  Image as ImageIcon,
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
    toggleSaveWatchlist,
    isCastModalOpen,
    setIsCastModalOpen,
    navigate,
  } = trailerfeatures;

  const [isTrailerVideoOpen, setIsTrailerVideoOpen] = useState(false);

  const {
    reviews,
    reviewStats,
    filterTab,
    setFilterTab,
    newReviewText,
    setNewReviewText,
    userRating,
    setUserRating,
    hoverRating,
    setHoverRating,
    handleSendReview,
    toggleLikeReview,
  } = useMovieReviews(movie?.id);

  // 1. Loading State
  if (isLoading || !movie) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 uppercase tracking-widest animate-pulse">
          ĐANG TẢI DỮ LIỆU BỘ PHIM...
        </p>
      </div>
    );
  }

  // 2. Error or Not Found State
  if (isError || !movie) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <h2 className="text-lg font-bold text-amber-400">
          Không tìm thấy dữ liệu bộ phim!
        </h2>
        <Link
          to="/"
          className="px-4 py-2 bg-[#141722] border border-[#23283a] hover:border-amber-400 text-xs text-gray-300 hover:text-white rounded-xl transition-all"
        >
          QUAY LẠI TRANG CHỦ
        </Link>
      </div>
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
              onClick={toggleSaveWatchlist}
              className={`p-3.5 border rounded-xl transition-all cursor-pointer active:scale-95 ${
                isSaved
                  ? "bg-amber-400 border-amber-400 text-black shadow-md"
                  : "bg-[#141722] border-[#23283a] text-gray-300 hover:text-white hover:border-amber-400"
              }`}
              title="Thêm vào danh sách theo dõi"
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </button>

            {/* Share Button */}
            <button
              type="button"
              onClick={() => alert("Đã sao chép liên kết bộ phim!")}
              className="p-3.5 bg-[#141722] border border-[#23283a] hover:border-amber-400 text-gray-300 hover:text-white rounded-xl transition-all cursor-pointer active:scale-95"
              title="Chia sẻ bộ phim"
            >
              <Share2 className="w-5 h-5" />
            </button>
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
            <button
              type="button"
              onClick={() => setIsCastModalOpen(true)}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer uppercase font-bold"
            >
              XEM TẤT CẢ
            </button>
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

      {/* SECTION 3: MORE LIKE THIS (Fix #4: Accent bar changed to amber matching site hierarchy) */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-5 bg-amber-400 rounded-sm" />
            PHIM TƯƠNG TỰ ĐỀ XUẤT
          </h2>
          <div className="flex items-center gap-2 font-mono">
            <button
              type="button"
              className="p-2 border border-white/10 hover:border-amber-400 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 border border-white/10 hover:border-amber-400 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DIVIDER LINE */}
      <hr className="max-w-7xl mx-auto border-white/10 mb-12" />

      {/* SECTION 4: USER REVIEWS & COMMENTS (Fix #1: Borderless split with vertical divider line) */}
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          ĐÁNH GIÁ & BÌNH LUẬN NGUỜI XEM
        </h2>

        {/* Top Split: Left Review Stats, Right Add Comment Form (Borderless with vertical divider) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 pb-8 border-b border-white/10 relative">
          {/* Left Column: Review Score Overview (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between text-center sm:text-left pr-0 lg:pr-6">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Tổng Quan Đánh Giá
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono my-2">
                {reviewStats.avgScore}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-1">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
              </div>
              <span className="text-[11px] font-mono text-gray-500">
                Dựa trên {reviewStats.totalCount} lượt đánh giá
              </span>
            </div>

            {/* Score Breakdown Progress Bars (Fix #3: Honest 0-count bars render empty/outline track) */}
            <div className="space-y-1.5 mt-6 font-mono text-[10px]">
              {reviewStats.ratingBars.map((barPct, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 text-gray-400 text-right">{5 - i}</span>
                  <div className="flex-1 bg-white/5 border border-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        reviewStats.totalCount > 0
                          ? "bg-amber-400"
                          : "bg-transparent"
                      }`}
                      style={{
                        width: reviewStats.totalCount > 0 ? `${barPct}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Divider Line between Ratings & Comments on Desktop */}
          <div className="hidden lg:block absolute left-[33.33%] top-0 bottom-8 w-[1px] bg-white/10 -translate-x-1/2" />

          {/* Right Column: Write Comment Form (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between pl-0 lg:pl-6">
            <form onSubmit={handleSendReview} className="space-y-4">
              {/* Comment Textarea Input */}
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder={`Chia sẻ cảm nghĩ của bạn về bộ phim ${movie.title}...`}
                rows="3"
                className="w-full bg-[#12141a] border border-white/10 focus:border-amber-400 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-all resize-none font-mono"
              />

              {/* Form Actions Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* 10-Star Interactive Rating Picker */}
                <div className="flex items-center gap-1 font-mono text-xs">
                  <span className="text-gray-400 text-[11px] mr-1">
                    Điểm đánh giá của bạn:
                  </span>
                  {Array(10)
                    .fill()
                    .map((_, i) => {
                      const starValue = i + 1;
                      const isLit = starValue <= (hoverRating || userRating);
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setUserRating(starValue)}
                          className="p-0.5 transition-transform hover:scale-125 cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isLit
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                      );
                    })}
                  <span className="text-amber-400 font-bold ml-1.5">
                    {hoverRating || userRating}/10
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>GỬI BÌNH LUẬN</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Clean Comment Feed List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#0a0b0e] border border-[#1e2230] hover:border-[#2b3145] rounded-2xl p-5 transition-all space-y-3"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white font-mono uppercase">
                        {rev.author}
                      </h4>
                      {rev.badge && (
                        <span className="px-2 py-0.5 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-mono font-bold rounded uppercase">
                          {rev.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">
                      {rev.time}
                    </span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 bg-[#12141a] px-2.5 py-1 rounded-lg border border-white/5 text-xs font-mono text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{rev.rating}/10</span>
                </div>
              </div>

              {/* Comment Body Content */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono">
                {rev.content}
              </p>

              {/* Comment Footer Controls (Like, Reply, Report) */}
              <div className="flex items-center gap-5 pt-2 font-mono text-xs text-gray-400">
                <button
                  type="button"
                  onClick={() => alert(`Phản hồi bình luận của ${rev.author}`)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Trả lời</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Đã gửi báo cáo vi phạm!")}
                  className="ml-auto hover:text-red-400 transition-colors cursor-pointer"
                  title="Báo cáo bình luận"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            className="px-6 py-3 bg-[#0a0b0e] border border-[#23283a] hover:border-amber-400 text-xs font-mono text-gray-300 hover:text-white font-bold rounded-xl transition-all cursor-pointer shadow-md uppercase"
          >
            XEM THÊM BÌNH LUẬN
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}

      {/* FULL CAST & CREW POPUP MODAL */}
      <CastModal
        isOpen={isCastModalOpen}
        onClose={() => setIsCastModalOpen(false)}
        movieCastNames={movie?.cast_members}
        movieTitle={movie?.name}
      />

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
