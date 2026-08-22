import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getWatchlist } from "../../service/watchlistService.js";
import { useHomeData } from "./useHomeData.js";
import { useToggleWatchlist } from "./useToggleWatchlist.js";

export const useWatchList = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // ⚡ Debounce search input by 400ms before sending query to PostgreSQL
  console.log("Search Query Updated:", searchQuery);

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
    data: watchlistData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["watchlist", user?.id, sortBy, page, searchQuery],
    queryFn: () => getWatchlist({ sortType: sortBy, page, q: searchQuery }),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
  });
  console.log("Fetched Watchlist Data:", watchlistData);

  // 2. Processed movies output directly
  const processedMovies = useMemo(() => {
    return [...watchlistData];
  }, [watchlistData]);

  // 3. Remove Movie Action (Calls handleToggle from useToggleWatchlist)
  const handleRemoveMovie = (movie, e) => {
    handleToggle(movie, e);
  };

  return {
    watchlistData,
    processedMovies,
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
