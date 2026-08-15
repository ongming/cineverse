import { useQuery } from "@tanstack/react-query";
import { getRevenueStats } from "../../service/revenue.js";

export function useRevenueStats(params = {}) {
  return useQuery({
    queryKey: ["revenue-stats", params],
    queryFn: () => getRevenueStats(params),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
  });
}
