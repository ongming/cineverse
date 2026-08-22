import { useWatchList } from "../../hooks/data/useWatchList.js";
import ComponentSearchBar from "../../components/SearchBar/ComponentSearchBar.jsx";
import SortBar from "../../components/SortBar/SortBar.jsx";
import TrailerWatchList from "./TrailerWatchList.jsx";
import { useCallback } from "react";

export default function WatchListGridContainer() {
  const {
    processedMovies,
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
    page,
    setPage,
  } = useWatchList();

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 🟢 Toolbar Bar: Search + Sort Dropdown (ALWAYS STAYS MOUNTED!) */}
      <div className="bg-[#0e1017] border border-white/10 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        {/* Left: Search Box */}
        <ComponentSearchBar onClick={handleSearch} />

        {/* Right: Sort Dropdown */}
        <SortBar
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          sortOptions={sortOptions}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="w-full min-h-[400px] bg-[#080808] text-white flex items-center justify-center font-mono text-base">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span>Loading Watchlist...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="w-full min-h-[400px] bg-[#080808] text-white flex items-center justify-center font-mono text-base text-red-400">
          Failed to load watchlist data.
        </div>
      ) : (
        /* Main Watchlist Container (ONLY THIS updates when search data arrives) */
        <TrailerWatchList
          processedMovies={processedMovies}
          handleRemoveMovie={handleRemoveMovie}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          suggestedMovies={suggestedMovies}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
