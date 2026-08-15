import { useQuery } from "@tanstack/react-query";
import { getTopRevenueMovies } from "../../service/revenue.js";

export function useRevenueData(params) {
  return useQuery({
    queryKey: ["revenue-movies", params],
    queryFn: () => getTopRevenueMovies(params),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
  });
}
