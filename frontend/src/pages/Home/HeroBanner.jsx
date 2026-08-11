// pages/Home/HeroBanner.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, Bookmark, Volume2, VolumeX } from "lucide-react";

export default function HeroBanner({ movies = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hoverTimerRef = useRef(null);

  // Auto switch banner slide every 7 seconds (if not actively playing trailer on hover)
  useEffect(() => {
    if (!movies || movies.length === 0 || isPlayingTrailer) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [movies, isPlayingTrailer]);

  // Restart trailer autoplay when slide changes IF the mouse is currently resting over the banner
  useEffect(() => {
    setIsPlayingTrailer(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    if (isMouseOver) {
      hoverTimerRef.current = setTimeout(() => {
        setIsPlayingTrailer(true);
      }, 300);
    }
  }, [currentIndex, isMouseOver]);

  const handleMouseEnter = () => {
      setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setIsPlayingTrailer(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  if (!movies || movies.length === 0) return null;
  const currentMovie = movies[currentIndex];
  const startSeconds = currentMovie.startTime || 10;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[80vh] sm:h-[85vh] bg-[#080808] overflow-hidden select-none group"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
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
              src={currentMovie.banner}
              alt={currentMovie.name}
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          )}

          {/* Vignette & Gradient Overlays for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/10 pointer-events-none z-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/20 to-transparent w-full sm:w-2/3 pointer-events-none z-5" />

          {/* Content Details Container */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center items-start z-10 text-left pointer-events-auto">
            {/* Top Rating & Status Pill */}
            <div className="flex items-center gap-2 mb-4 font-mono text-xs">
              <span className="px-3 py-1 bg-amber-400 text-black font-extrabold rounded-full flex items-center gap-1 shadow-lg shadow-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-black" />
                {currentMovie.rating} TMDb
              </span>

              <span className="px-3 py-1 text-cyan-400 font-bold rounded-full uppercase">
                BOM TẤT HOT NHẤT
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-mono uppercase tracking-tight mb-3 line-clamp-2 max-w-3xl drop-shadow-2xl">
              {currentMovie.name}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed line-clamp-3 max-w-2xl mb-6 text-shadow">
              {currentMovie.description}
            </p>

            {/* Action CTA Buttons Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={`/trailer/${currentMovie.id}`}
                className="py-3.5 px-6 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs sm:text-sm font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-400/30 active:scale-95 no-underline"
              >
                <Play className="w-4.5 h-4.5 fill-black" />
                <span>XEM TRAILER ĐẦY ĐỦ</span>
              </Link>

              <button
                type="button"
                onClick={() => alert("Đã thêm vào Danh sách theo dõi!")}
                className="py-3.5 px-5 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 text-xs sm:text-sm font-mono font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">WATCHLIST</span>
              </button>

              {/* Sound Toggle Mute/Unmute Button */}
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
        className={`absolute bottom-6 right-6 z-10 py-4 px-4 bg-black/60 hover:bg-black/80 border text-xs sm:text-sm font-mono font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
          !isMuted
            ? "border-cyan-400 text-cyan-400 shadow-lg border-2"
            : "border-white/20 text-gray-400 hover:text-white"
        }`}
        title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {!isMuted ? (
          <>
            <Volume2 className="w-4 h-4 text-cyan-neon" />
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-gray-400" />
          </>
        )}
      </button>
    </div>
  );
}
