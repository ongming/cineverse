// hooks/data/useMovies.js
import { useQuery } from "@tanstack/react-query";
import { movies } from "../../data/movies.js";

const fetchMovies = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (movies) {
        resolve(movies);
      } else {
        reject(new Error("Failed to fetch movies"));
      }
    }, 1000);
  });
};

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
  });
};
