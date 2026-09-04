// pages/Home/HeroBanner.jsx
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, Bookmark, Volume2, VolumeX } from "lucide-react";
import { useHeroBanner } from "../../hooks/ui/useHeroBanner.js";

export default function HeroBanner({ movies = [] }) {
  const {
    currentIndex,
    setCurrentIndex,
    isPlayingTrailer,
    isMuted,
    setIsMuted,
    currentMovie,
    startSeconds,
    handleMouseEnter,
    handleMouseLeave,
    handleToggle,
    isBookmarked,
  } = useHeroBanner(movies);

  if (!movies || movies.length === 0 || !currentMovie) return null;

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -400) {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 400) {
      setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full mx-auto h-[40vh] sm:h-[45vh] lg:h-[85vh] bg-[#080808] overflow-hidden select-none group touch-pan-y"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Background YouTube Video Trailer or Static Backdrop Image */}
          {isPlayingTrailer && currentMovie.trailerKey ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
              <iframe
                src={`https://www.youtube.com/embed/${currentMovie.trailerKey}?autoplay=1&mute=${
                  isMuted ? 1 : 0
                }&controls=0&loop=1&playlist=${currentMovie.trailerKey}&start=${startSeconds}&enablejsapi=1`}
                title={currentMovie.name}
                className="w-full h-full object-cover scale-150 transform transition-transform duration-1000"
                allow="autoplay; encrypted-media"
              />
            </div>
          ) : (
            <img
              src={currentMovie.banner || currentMovie.poster_path}
              alt={currentMovie.name}
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          )}

          {/* Vignette & Gradient Overlays for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 pointer-events-none z-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/20 to-transparent w-full sm:w-2/3 pointer-events-none z-5" />

          {/* Content Details Container */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-end pb-15 sm:pb-20 items-start z-10 text-left pointer-events-auto">
            {/* Top Rating & Status Pill */}
            <div className="flex items-center gap-2 mb-4 font-mono text-xs">
              <span className="px-3 py-1 bg-amber-400 text-black font-extrabold rounded-full flex items-center gap-1 shadow-lg shadow-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-black" />
                {currentMovie.vote_average
                  ? currentMovie.vote_average
                  : "N/A"}{" "}
                TMDb
              </span>

              <span className="px-3 py-1  hidden sm:block text-cyan-400 font-bold rounded-full uppercase">
                BOM TẤT HOT NHẤT TUẦN
              </span>
            </div>

            {/* Title */}
            <h1 className="text-md sm:text-4xl lg:text-6xl font-black text-white font-mono uppercase tracking-tight mb-3 line-clamp-2 max-w-3xl drop-shadow-2xl">
              {currentMovie.title}
            </h1>

            {/* Description */}
            <p className="text-[10px] hidden lg:block sm:text-sm text-gray-300 font-mono leading-relaxed line-clamp-3 max-w-2xl mb-6 text-shadow">
              {currentMovie.overview ||
                "Không có mô tả chi tiết cho bộ phim này. Hãy xem trailer để biết thêm thông tin!"}
            </p>

            {/* Action CTA Buttons Bar */}
            <div className="flex p-3 sm:p-0 flex-wrap items-center gap-3">
              <Link
                to={`/trailer/${currentMovie.id}`}
                className="py-3.5 px-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-[10px] sm:text-sm font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-400/30 active:scale-95 no-underline"
              >
                <Play className="w-4.5 h-4.5 fill-black" />
                <span className="hidden sm:inline">XEM TRAILER ĐẦY ĐỦ</span>
              </Link>

              <button
                type="button"
                onClick={(e) => handleToggle(currentMovie, e)}
                className={`py-3.5 px-3.5 border text-[10px] sm:text-sm font-mono font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  isBookmarked(currentMovie.id)
                    ? "bg-amber-400 border-amber-400 text-black shadow-lg shadow-amber-400/20"
                    : "bg-black/60 hover:bg-black/80 border-white/20 hover:border-amber-400 text-white hover:text-amber-400"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked(currentMovie.id) ? "fill-black" : ""}`}
                />
                <span className="hidden sm:inline">WATCHLIST</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {movies.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              currentIndex === idx
                ? "w-20 bg-cyan-neon"
                : "w-8 bg-white/30 hover:bg-white/60"
            }`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => setIsMuted(!isMuted)}
        className={`absolute bottom-12 right-6 flex items-center justify-center w-10 h-10 z-10 py-1 px-1 bg-black/60 hover:bg-black/80 border text-xs sm:text-sm font-mono font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
          !isMuted
            ? "border-cyan-400 text-cyan-400 shadow-lg border-2"
            : "border-white/20 text-gray-400 hover:text-white"
        }`}
        title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {!isMuted ? (
          <Volume2 className="w-4 h-4 text-cyan-neon" />
        ) : (
          <VolumeX className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  );
}
