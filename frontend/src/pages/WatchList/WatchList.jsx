import { useWatchList } from "../../hooks/data/useWatchList.js";
import { Search, ChevronDown } from "lucide-react";
import TrailerWatchList from "./TrailerWatchList.jsx";
import { motion } from "framer-motion";
import SortBar from "../../components/SortBar/SortBar.jsx";

export default function WatchList() {
  const {
    processedMovies,
    setUserWatchlist,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    isSortOpen,
    setIsSortOpen,
    sortOptions,
    isLoading,
    isError,
    handleRemoveMovie,
    suggestedMovies,
  } = useWatchList();

  // Filter and sort movies

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex items-center justify-center font-mono text-base">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading Watchlist...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex items-center justify-center font-mono text-base text-red-400">
        Failed to load watchlist data.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-10 px-4 sm:px-8 xl:px-20 font-sans">
      {/* Header Banner Section (Matching Screenshot) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto flex flex-col mb-8 gap-6 border-b border-white/10 pb-6"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          DANH SÁCH XEM SAU
        </h1>
        <p className="text-gray-400 text-sm sm:text-base font-normal">
          Quản lý và lưu trữ danh sách Trailer yêu thích của bạn
        </p>
      </motion.header>

      {/* Toolbar Bar: Search + Genre Pills + Sort + View Mode (Matching Screenshot) */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-[#0e1017] border border-white/10 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
          {/* Left: Search Box */}
          <div className="relative flex-1 min-w-[220px] max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm Trailer..."
              className="w-full bg-[#07080c] border border-white/10 focus:border-cyan-400 text-xs text-white placeholder-gray-500 rounded-xl pl-9 pr-4 py-2 focus:outline-none transition-all font-sans"
            />
          </div>

          {/* Right: Sort Dropdown & View Mode Toggle */}
        </div>
      </div>

      {/* Main Watchlist Container */}
      <TrailerWatchList
        processedMovies={processedMovies}
        handleRemoveMovie={handleRemoveMovie}
        searchQuery={searchQuery}
        onClearSearch={() => {
          setSearchQuery("");
        }}
        suggestedMovies={suggestedMovies}
      />
    </div>
  );
}
