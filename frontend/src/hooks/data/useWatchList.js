import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext.jsx";
import { getWatchlist } from "../../service/watchlistService.js";
import { useState, useEffect, useMemo } from "react";
import { removeFromWatchlist } from "../../service/watchlistService.js";
import { useHomeData } from "./useHomeData.js";

export const useWatchList = () => {
  const { user } = useAuth();
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useHomeData();
  const { nowPlaying: suggestedMovies } = data || {};
  const sortOptions = [
    { value: "recent", label: "Mới nhất" },
    { value: "rating", label: "Đánh giá cao" },
    { value: "year", label: "Năm phát hành" },
  ];

  const {
    data: watchlistData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["watchlist", user?.id],
    queryFn: getWatchlist,
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
  });

  useEffect(() => {
    if (watchlistData) {
      setUserWatchlist(watchlistData);
    }
  }, [watchlistData]);

  const handleRemoveMovie = async (movieId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setUserWatchlist((prev) => prev.filter((item) => item.id !== movieId));
    try {
      await removeFromWatchlist(movieId);
    } catch (err) {
      console.error("Lỗi khi xóa khỏi danh sách theo dõi:", err);
    }
  };
  const processedMovies = useMemo(() => {
    let result = [...userWatchlist];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((m) =>
        (m.name || m.title || "").toLowerCase().includes(q),
      );
    }
    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "rating") {
      result.sort(
        (a, b) => (b.rating || b.vote_average) - (a.rating || a.vote_average),
      );
    } else if (sortBy === "year") {
      result.sort((a, b) => (b.year || 2024) - (a.year || 2024));
    }

    return result;
  }, [userWatchlist, searchQuery, sortBy]);

  return {
    watchlistData,
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
  };
};
