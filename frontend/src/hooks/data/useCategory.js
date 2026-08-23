import { useQuery } from "@tanstack/react-query";
import { getCategories, getMoviesByCategory } from "../../service/category.js";

// Hook 1: Fetch list of all categories/genres
export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
  });
};

// Hook 2: Fetch movies by category/genre via TanStack React Query
export const useCategoryMovies = ({ genreName, genreId, page = 1 }) => {
  return useQuery({
    queryKey: ["categoryMovies", genreName, genreId, page],
    queryFn: () => getMoviesByCategory({ genreName, genreId, page }),
    enabled: !!(genreName || genreId),
    staleTime: 1000 * 60 * 5, // 5 minutes fresh cache
  });
};
