import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getWatchlist } from "../../service/watchlistService.js";
import { useHomeData } from "./useHomeData.js";
import { useToggleWatchlist } from "./useToggleWatchlist.js";
import { useDebounce } from "../ui/useDebounce.js";

export const useWatchList = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // ⚡ Debounce search input by 400ms before sending query to PostgreSQL
  const debouncedSearch = useDebounce(searchQuery, 400);

  // Suggested movies from home data
  const { data: homeData } = useHomeData();
  const { nowPlaying: suggestedMovies } = homeData || {};

  // Watchlist Toggle Hook for removing items
  const { handleToggle } = useToggleWatchlist();

  const sortOptions = [
    { value: "recent", label: "Mới nhất" },
    { value: "rating", label: "Đánh giá cao" },
    { value: "year", label: "Năm phát hành" },
  ];

  // 1. Fetch Paginated & Debounced Search Watchlist Data from Backend PostgreSQL
  const {
    data: watchlistResponse = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["watchlist", user?.id, sortBy, page, debouncedSearch],
    queryFn: () => getWatchlist({ sortType: sortBy, page, q: debouncedSearch }),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
  });

  const { watchlist: processedMovies = [], hasNextPage = false } = watchlistResponse || {};

  // 3. Remove Movie Action (Calls handleToggle from useToggleWatchlist)
  const handleRemoveMovie = (movie, e) => {
    handleToggle(movie, e);
  };

  return {
    watchlistData: processedMovies,
    processedMovies,
    hasNextPage,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    page,
    setPage,
    isSortOpen,
    setIsSortOpen,
    sortOptions,
    isLoading,
    isError,
    handleRemoveMovie,
    suggestedMovies,
  };
};
