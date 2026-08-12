// hooks/auth/useWatchList.js
import { useQuery } from "@tanstack/react-query";
import SortedWatchList from "../../service/SortedWatchList.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { watchlistData } from "../../data/watchlist.js";

const fetchWatchList = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const userWatchList = SortedWatchList(watchlistData, userId);
        resolve(userWatchList);
      } catch (error) {
        reject(new Error("Failed to fetch watchlist", { cause: error }));
      }
    }, 1000);
  });
};

export const useWatchList = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["watchlist", user?.id],
    queryFn: () => fetchWatchList(user.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
};
