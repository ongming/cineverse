import { Link } from "react-router-dom";
import { useRankingData } from "../../hooks/data/useRankingData.js";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingState from "../../components/Common/LoadingState.jsx";
import ErrorState from "../../components/Common/ErrorState.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Ranking() {
  const {
    topRatedMovies,
    categoryData,
    isLoading,
    isError,
    activeGenre,
    setactiveGenre,
    handleGenreId,
  } = useRankingData();

  if (isLoading) {
    return <LoadingState message="ĐANG TẢI BẢNG XẾP HẠNG PHIM..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Lỗi tải Bảng Xếp Hạng!"
        message="Không thể nạp dữ liệu xếp hạng phim. Vui lòng thử lại sau."
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white font-mono text-left py-12 px-4 sm:px-8 xl:px-16 selection:bg-amber-400 selection:text-black">
      <div className="max-w-7xl mx-auto">
        {/* HEADER AREA WITH ANIMATION */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white m-0 leading-none">
            BẢNG XẾP HẠNG
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-mono tracking-widest uppercase mt-3 m-0">
            DỮ LIỆU ĐƯỢC THU THẬP TỪ TMDB
          </p>
        </motion.header>

        {/* MAIN LAYOUT WITH SIDEBAR */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* GENRE FILTER SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
              BỘ LỌC THỂ LOẠI
            </div>

            <nav className="flex flex-row lg:flex-col flex-wrap gap-y-3 gap-x-6 text-xs font-mono uppercase tracking-wider">
              <button
                type="button"
                onClick={() => handleGenreId(null, setactiveGenre)}
                className={`text-left transition-all duration-300 cursor-pointer flex items-center gap-2 bg-transparent border-none p-0 ${
                  activeGenre === null
                    ? "text-amber-400 font-extrabold border-l-2 border-amber-400 pl-2 -ml-2"
                    : "text-gray-400 hover:text-amber-400"
                }`}
              >
                <span>ALL GENRES</span>
              </button>

              {categoryData.map((genre) => {
                const isActive = activeGenre === genre.id;
                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => handleGenreId(genre.id, setactiveGenre)}
                    className={`text-left transition-all duration-300 cursor-pointer flex items-center gap-2 bg-transparent border-none p-0 ${
                      isActive
                        ? "text-amber-400 font-extrabold border-l-2 border-amber-400 pl-2 -ml-2"
                        : "text-gray-400 hover:text-amber-400"
                    }`}
                  >
                    <span className="truncate">{genre.name}</span>
                  </button>
                );
              })}
            </nav>
          </motion.aside>

          {/* EDITORIAL MAGAZINE RANKING LIST WITH STAGGERED ANIMATIONS */}
          <main className="flex-1 w-full space-y-0 min-h-[500px]">
            <AnimatePresence mode="wait">
              {topRatedMovies.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-20 text-center font-mono text-gray-500 uppercase tracking-widest"
                >
                  KHÔNG CÓ DỮ LIỆU PHIM ĐỂ HIỂN THỊ CHO THỂ LOẠI NÀY. VUI LÒNG
                  CHỌN THỂ LOẠI KHÁC.
                </motion.div>
              ) : (
                <motion.div
                  key={activeGenre || "all"}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-0"
                >
                  {topRatedMovies.map((movie, index) => {
                    const rank = index + 1;
                    const isOdd = rank % 2 !== 0;

                    return (
                      <motion.article
                        key={movie.id}
                        variants={itemVariants}
                        layout
                        className="relative border-b border-white/10 py-12 lg:py-16 first:pt-0 last:border-b-0 group overflow-hidden"
                      >
                        {/* OVERSIZED BACKGROUND NUMERAL */}
                        <div
                          className={`aria-hidden:true absolute select-none pointer-events-none font-mono font-black text-[100px] sm:text-[140px] lg:text-[180px] leading-none transition-all duration-500 ${
                            rank === 1
                              ? "text-amber-400/20 top-0 left-0 sm:left-4"
                              : isOdd
                                ? "text-white/5 top-5 left-4"
                                : "text-white/5 top-10 left-4 lg:left-75"
                          }`}
                        >
                          {rank}
                        </div>

                        {/* ALTERNATING FLEX ROW LAYOUT (DESKTOP) */}
                        <div
                          className={`relative z-10 flex flex-col gap-8 items-center ${
                            isOdd ? "lg:flex-row" : "lg:flex-row-reverse"
                          }`}
                        >
                          {/* TEXT CONTENT BLOCK */}
                          <div className="flex-1 w-full space-y-4 text-left">
                            {/* RANK TAG */}
                            <div className="inline-flex items-center gap-2">
                              <span
                                className={`text-xs font-mono font-black uppercase tracking-widest px-2.5 py-0.5 border ${
                                  rank === 1
                                    ? "bg-amber-400 text-black border-amber-400 font-extrabold"
                                    : "bg-white/5 border-white/10 text-gray-400"
                                }`}
                              >
                                {rank === 1
                                  ? "★ TOP RATED #1"
                                  : `RANKING #${rank}`}
                              </span>
                            </div>

                            {/* TITLE */}
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wider leading-tight text-white m-0 transition-colors duration-300 group-hover:text-amber-400">
                              <Link
                                to={`/trailer/${movie.id}`}
                                className="no-underline text-inherit"
                              >
                                {movie.title}
                              </Link>
                            </h2>

                            {/* METADATA CAPTION LINE */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-gray-400 tracking-wider">
                              <span>{movie.release_date || "N/A"}</span>
                              <span className="text-gray-600">|</span>
                              <span>{movie.runtime || "N/A"} phút</span>
                              <span className="text-gray-600">|</span>

                              <span className="text-gray-300 font-bold uppercase">
                                DIR: {movie.director_name || "N/A"}
                              </span>
                              <span className="text-gray-600">|</span>
                              <span className="flex items-center gap-1 font-bold text-white">
                                <Star
                                  className={`w-3.5 h-3.5 ${
                                    rank === 1
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-gray-400 text-gray-400"
                                  }`}
                                />
                                {movie.vote_average || "N/A"}{" "}
                                <span className="text-gray-500 font-normal">
                                  / 10
                                </span>
                              </span>
                            </div>

                            {/* EDITORIAL DESCRIPTION */}
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-mono line-clamp-3 max-w-2xl">
                              {movie.overview || "KHÔNG CÓ MÔ TẢ CHO PHIM NÀY."}
                            </p>
                          </div>

                          {/* POSTER IMAGE CONTAINER WITH ROTATE & HOVER MOTION */}
                          <motion.div
                            whileHover={{
                              scale: 1.04,
                              rotate: isOdd ? 1.5 : -1.5,
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="shrink-0 w-full p-15 sm:p-0 sm:w-[220px] lg:w-[260px]"
                          >
                            <Link
                              to={`/trailer/${movie.id}`}
                              className="block relative group/poster overflow-hidden rounded-md border border-white/10 shadow-2xl transition-all duration-500 hover:border-amber-400/50"
                            >
                              <img
                                src={movie.poster_path}
                                alt={movie.title}
                                className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover/poster:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                                  VIEW DETAILS →
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
