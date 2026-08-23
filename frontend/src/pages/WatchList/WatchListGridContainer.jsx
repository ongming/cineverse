import { useWatchList } from "../../hooks/data/useWatchList.js";
import ComponentSearchBar from "../../components/SearchBar/ComponentSearchBar.jsx";
import SortBar from "../../components/SortBar/SortBar.jsx";
import TrailerWatchList from "./TrailerWatchList.jsx";
import LoadingState from "../../components/Common/LoadingState.jsx";
import ErrorState from "../../components/Common/ErrorState.jsx";
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
    hasNextPage,
    refetch,
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
        <LoadingState message="ĐANG TẢI DANH SÁCH THEO DÕI..." fullScreen={false} />
      ) : isError ? (
        <ErrorState
          title="Lỗi tải Danh Sách Theo Dõi!"
          message="Không thể nạp dữ liệu danh sách theo dõi của bạn."
          onRetry={refetch}
          fullScreen={false}
        />
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
          hasNextPage={hasNextPage}
        />
      )}
    </div>
  );
}
