import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext.jsx";
import { getWatchlistIds } from "../../service/watchlistService.js";

export const useWatchListIds = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["watchlist-ids", user?.id],
    queryFn: getWatchlistIds,
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
  });
};
