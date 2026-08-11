import { useState } from "react";
import { Link } from "react-router-dom";
import { useTrailerDetail } from "../../hooks/TrailerHooks/useTrailerDetail.js";
import { useMovieImages } from "../../hooks/TrailerHooks/useMovieImages.js";
import { useMovieReviews } from "../../hooks/TrailerHooks/useMovieReviews.js";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import CastModal from "../../components/CastModal/CastModal.jsx";
import TrailerVideo from "./trailerVideo.jsx";
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
  // Extract state & business logic from custom hooks
  const {
    id,
    movie,
    movieCast,
    isLoading,
    isError,
    roi,
    formattedBudget,
    formattedRevenue,
    relatedMovies,
    isSaved,
    toggleSaveWatchlist,
    isCastModalOpen,
    setIsCastModalOpen,
    navigate,
  } = useTrailerDetail();

  const [isTrailerVideoOpen, setIsTrailerVideoOpen] = useState(false);

  const {
    selectedIndex,
    setSelectedIndex,
    images,
    activeImage,
    isLightboxOpen,
    setIsLightboxOpen,
    handleNextImage,
    handlePrevImage,
    // Thumbnail Sliding Window Exports
    handleNextThumbStrip,
    handlePrevThumbStrip,
    thumbStripStyle,
    // Pointer Drag Gesture Exports
    dragStyle,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useMovieImages(id);

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
    likedReviews,
    handleSendReview,
    toggleLikeReview,
  } = useMovieReviews(id);

  // 1. Loading State
  if (isLoading) {
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
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Hero Image Viewport with Drag Gesture */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={dragStyle}
            className="relative w-full aspect-[16/9] bg-[#12141a] border border-[#222533] rounded-2xl overflow-hidden shadow-2xl group select-none"
          >
            {activeImage && (
              <img
                src={activeImage.file_path}
                alt={movie.name}
                className="w-full h-full object-cover pointer-events-none"
              />
            )}

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40 pointer-events-none" />

            {/* Top Badges: Type, Rating & Drag Hint */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-xs pointer-events-none">
              {/* Lightbox Zoom Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="p-2 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-xl text-white hover:text-amber-400 transition-all cursor-pointer pointer-events-auto"
                title="Xem ảnh phóng to"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-full text-white hover:text-amber-400 transition-all cursor-pointer z-10 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-full text-white hover:text-amber-400 transition-all cursor-pointer z-10 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Drag Gesture Instruction Hint */}
            <div className="absolute hidden group-hover:block bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-transparent backdrop-blur-md rounded-full  text-[10px] font-mono text-white pointer-events-none">
              Vuốt trái / phải để chuyển ảnh
            </div>
          </div>

          {/* Gallery Controls & Thumbnails Strip with 1-by-1 Smooth Slide */}
          <div className="flex justify-center items-center gap-2 p-3">
            {/* Left Arrow Button (Slide 1 thumbnail left) */}
            <button
              type="button"
              onClick={handlePrevThumbStrip}
              className="p-2  hover:border-amber-400 text-gray-300 hover:text-amber-400 rounded-xl transition-all cursor-pointer shrink-0 z-10"
              title="Trượt ảnh trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Viewport Window Container (Clipped Viewport for 6 thumbnails) */}
            <div className="overflow-hidden w-[248px] sm:w-[390px]">
              {/* Inner Sliding Track with transform translateX */}
              <div
                className="flex items-center gap-2 mx-1.5"
                style={thumbStripStyle}
              >
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-14 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedIndex === idx
                        ? "border-amber-400 scale-105 shadow-md shadow-amber-400/30"
                        : "border-white/10 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.file_path}
                      alt="thumb"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Arrow Button (Slide 1 thumbnail right) */}
            <button
              type="button"
              onClick={handleNextThumbStrip}
              className="p-2  hover:border-amber-400 text-gray-300 hover:text-amber-400 rounded-xl transition-all cursor-pointer shrink-0 z-10"
              title="Trượt ảnh tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Movie Meta & Action Buttons (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="flex flex-col gap-4">
            {/* Title & Slogan */}
            <h1 className="text-3xl sm:text-4xl font-black text-white font-mono uppercase tracking-tight mb-1">
              {movie.name}
            </h1>

            {/* Metadata Pills Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-400 rounded-lg font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {movie.rating} TMDb
              </span>
              <span className="px-2.5 py-1 bg-[#181a24] border border-[#252a3b] text-gray-300 rounded-lg font-bold">
                Năm {movie.year}
              </span>
              <span className="px-2.5 py-1 bg-[#181a24] border border-[#252a3b] text-gray-300 rounded-lg font-bold">
                {movie.duration}
              </span>
              <span className="px-2.5 py-1 bg-[#181a24] border border-[#252a3b] text-red-400 rounded-lg font-bold">
                {movie.ageRating}
              </span>
            </div>

            {/* Specs Tags */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-gray-400">
              {movie.genre?.map((g) => (
                <span
                  key={g}
                  className="px-3 py-2 bg-[#141 722] border border-cyan-400 rounded-2xl text-cyan-400 font-bold"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Description Synopsis */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono mb-6">
              {movie.description}
            </p>
          </div>

          {/* Primary Action Buttons Bar */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#1f2332]">
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

      {/* SECTION 2: MIDDLE SECTION (Left: Cast & Crew, Right: Commercial Metrics) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Top Cast & Crew (7 Cols) */}
        <div className="lg:col-span-7 bg-[#12141a] border border-[#222533] rounded-2xl p-5 sm:p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base sm:text-lg font-bold text-white font-mono uppercase tracking-wide">
              DÀN DIỄN VIÊN & ĐẠO DIỄN
            </h2>
            <button
              type="button"
              onClick={() => setIsCastModalOpen(true)}
              className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer uppercase font-bold"
            >
              XEM TẤT CẢ
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Director Avatar Card */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-400/40 group-hover:border-amber-400 transition-all p-1 mb-2">
                <img
                  src="https://i.pravatar.cc/150?img=33"
                  alt={movie.director}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h4 className="text-xs font-bold text-white font-mono line-clamp-1">
                {movie.director}
              </h4>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase mt-0.5">
                ĐẠO DIỄN
              </span>
            </div>

            {/* Cast Avatars */}
            {movieCast.slice(0, 3).map((act) => (
              <div
                key={act.id}
                onClick={() => navigate(`/actor/${act.id}`)}
                className="flex flex-col items-center text-center group cursor-pointer"
                title={`Xem trang cá nhân của ${act.name}`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-amber-400 transition-all p-1 mb-2">
                  <img
                    src={act.profile_path}
                    alt={act.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h4 className="text-xs font-bold text-white font-mono line-clamp-1 group-hover:text-amber-400 transition-colors">
                  {act.name}
                </h4>
                <span className="text-[10px] font-mono text-gray-400 uppercase mt-0.5 line-clamp-1">
                  {act.character_name || "DIỄN VIÊN CHÍNH"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Commercial Metrics & Rate Widget (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Commercial Financial Metrics Card */}
          <div className="bg-[#12141a] border border-[#222533] rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                CHỈ SỐ THƯƠNG MẠI & DOANH THU
              </h3>
            </div>

            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f2332]">
                <span className="text-xs text-gray-400">Kinh Phí Đầu Tư</span>
                <span className="text-sm font-bold text-white">
                  {formattedBudget}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#1f2332]">
                <span className="text-xs text-gray-400">Tổng Doanh Thu</span>
                <span className="text-sm font-bold text-cyan-400">
                  {formattedRevenue}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-400">
                  Tỷ Lệ ROI Ước Tính
                </span>
                <span
                  className={`text-base font-black ${roi < 0 ? "text-red-400" : "text-emerald-400 "}`}
                >
                  {roi < 0 ? `${roi}%` : `+${roi}%`}
                </span>
              </div>
            </div>
          </div>

          {/* Rate Movie Widget */}
          <div className="bg-[#12141a] border border-[#222533] hover:border-amber-400/40 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all group">
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

      {/* SECTION 3: MORE LIKE THIS (RECOMMENDED MOVIES CAROUSEL) */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-5 bg-cyan-400 rounded-sm" />
            PHIM TƯƠNG TỰ ĐỀ XUẤT
          </h2>
          <div className="flex items-center gap-2 font-mono">
            <button
              type="button"
              className="p-2 bg-[#12141a] border border-[#222533] hover:border-amber-400 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 bg-[#12141a] border border-[#222533] hover:border-amber-400 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {relatedMovies.map((rec) => (
            <MovieCard key={rec.id} movie={rec} />
          ))}
        </div>
      </div>

      {/* SECTION 4: USER REVIEWS & COMMENTS (Clean & Fast) */}
      <div className="max-w-7xl mx-auto bg-[#12141a] border border-[#222533] rounded-2xl p-5 sm:p-8 shadow-2xl">
        <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wide mb-8 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          ĐÁNH GIÁ & BÌNH LUẬN NGUỜI XEM
        </h2>

        {/* Top Split: Left Review Stats, Right Add Comment Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#1f2332]">
          {/* Left Column: Review Score Overview (4 Cols) */}
          <div className="lg:col-span-4 bg-[#0a0b0e] border border-[#1e2230] rounded-2xl p-5 flex flex-col justify-between text-center sm:text-left">
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

            {/* Score Breakdown Progress Bars */}
            <div className="space-y-1.5 mt-6 font-mono text-[10px]">
              {reviewStats.ratingBars.map((barPct, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 text-gray-400 text-right">{5 - i}</span>
                  <div className="flex-1 bg-[#1a1d29] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Write Comment Form (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0a0b0e] border border-[#1e2230] rounded-2xl p-5 flex flex-col justify-between">
            <form onSubmit={handleSendReview} className="space-y-4">
              {/* Comment Textarea Input */}
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder={`Chia sẻ cảm nghĩ của bạn về bộ phim ${movie.name}...`}
                rows="3"
                className="w-full bg-[#12141a] border border-[#23283a] focus:border-cyan-400 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-all resize-none font-mono"
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
                  className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
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
                  onClick={() => toggleLikeReview(rev.id)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    likedReviews[rev.id]
                      ? "text-cyan-400 font-bold"
                      : "hover:text-white"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Thích ({rev.likes_count})</span>
                </button>
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
      {isLightboxOpen && activeImage && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={activeImage.file_path}
            alt={movie.name}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/20"
          />
        </div>
      )}

      {/* FULL CAST & CREW POPUP MODAL */}
      <CastModal
        isOpen={isCastModalOpen}
        onClose={() => setIsCastModalOpen(false)}
        movieCastNames={movie?.cast}
        movieTitle={movie?.name}
      />

      {/* CYAN-NEON YOUTUBE-INSPIRED POPUP PLAYER */}
      <TrailerVideo
        isOpen={isTrailerVideoOpen}
        onClose={() => setIsTrailerVideoOpen(false)}
        videoKey={
          movie?.trailerUrl?.includes("v=")
            ? movie.trailerUrl.split("v=")[1]?.split("&")[0]
            : movie?.trailerUrl?.split("/").pop() || "d9MyW72ELq0"
        }
        movieTitle={movie?.name}
      />
    </div>
  );
}
