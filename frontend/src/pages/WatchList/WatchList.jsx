import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useMovies } from "../../hooks/useMovies.js";
import { useWatchList } from "../../hooks/useWatchList.js";
import { Bookmark, Search, Film, Trash2, X, Filter } from "lucide-react";
import { useEffect } from "react";
import SortBar from "../../components/SortBar/SortBar.jsx";
import TrailerWatchList from "./TrailerWatchList.jsx";

export default function WatchList() {
  const { user } = useAuth();
  const { data: userWatchlistData, isLoading, isError } = useWatchList();
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const {
    data: movies,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useMovies();

  useEffect(() => {
    if (userWatchlistData) {
      setUserWatchlist(userWatchlistData);
    }
  }, [userWatchlistData]);

  const handleRemoveMovie = (movieId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setUserWatchlist((prev) => prev.filter((item) => item.id !== movieId));
  };

  // Clear all movies for current user
  const handleClearAll = () => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách theo dõi?")
    ) {
      setUserWatchlist([]);
    }
  };

  // Filter and sort movies
  const processedMovies = useMemo(() => {
    let result = [...userWatchlist];
    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((m) => m.name.toLowerCase().includes(q));
    }

    // Sort by option
    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year") {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [userWatchlist, searchQuery, sortBy]);

  const sortOptions = [
    { value: "recent", label: "Mới thêm gần đây" },
    { value: "rating", label: "Đánh giá cao nhất" },
    { value: "year", label: "Năm phát hành" },
    { value: "name", label: "Tên phim (A-Z)" },
  ];
  if (isLoading || isMoviesLoading) {
    return (
      <div className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen box-border mt-0 font-mono text-xl font-bold flex items-center justify-center">
        Đang lấy dữ liệu danh sách theo dõi...
      </div>
    );
  }

  if (isError || isMoviesError) {
    return (
      <div className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen box-border mt-0 font-mono text-xl font-bold flex items-center justify-center">
        Lỗi khi lấy dữ liệu danh sách theo dõi. Vui lòng thử lại sau.
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-8 px-4 sm:px-8 xl:px-16 font-sans">
      {/* Header Banner Section */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-amber-400/10 rounded-xl border border-amber-400/30 text-amber-400">
              <Bookmark className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase font-mono">
              CINEVERSE WATCHLIST
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white font-sans">
            Danh sách theo dõi phim
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-sans mt-2">
            Quản lý danh sách các bộ phim bom tấn đã lưu của{" "}
            <span className="text-amber-400 font-semibold">
              {user?.username || "Minh"}
            </span>
            .
          </p>
        </div>

        {/* Counter Badge in Gold theme */}
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-full bg-[#12141a] border border-[#262a36] text-xs font-mono font-bold uppercase text-gray-300 tracking-wider flex items-center gap-2 shadow-lg">
            <Film className="w-4 h-4 text-amber-400" />
            <span>
              <strong className="text-amber-400 text-sm">
                {userWatchlist.length}
              </strong>{" "}
              PHIM ĐÃ LƯU
            </span>
          </div>

          {userWatchlist.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="p-2.5 rounded-full bg-[#12141a] border border-[#262a36] hover:border-red-500/50 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Xóa toàn bộ danh sách"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Toolbar Bar: Search Input + Sort Dropdown */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-[#12141a] border border-[#222634] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search Box */}
          <div className="relative w-full sm:w-[320px] md:w-[400px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search watchlist..."
              className="w-full bg-[#0a0b0e] border border-[#232736] focus:border-amber-400 text-sm text-white placeholder-gray-500 rounded-xl pl-10 pr-9 py-2.5 focus:outline-none transition-all font-mono"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <SortBar
            isSortOpen={isSortOpen}
            setIsSortOpen={setIsSortOpen}
            sortOptions={sortOptions}
            sortBy={sortBy}
            setSortBy={setSortBy}
            Icon = {<Filter className="w-4 h-4 text-amber-400" />}
          />
        </div>
      </div>
      <TrailerWatchList
        processedMovies={processedMovies}
        handleRemoveMovie={handleRemoveMovie}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery("")}
      />
    </div>
  );
}
