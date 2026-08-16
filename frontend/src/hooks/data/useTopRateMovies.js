import { getTopRatedMovies } from "../../service/movie.js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const handleGenreId = (genreId, setactiveGenre) => {
  return setactiveGenre(genreId);
};

export function useTopRateMovies(genreId) {
  const [activeGenre, setactiveGenre] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-rated-movies", activeGenre],
    queryFn: () => getTopRatedMovies(activeGenre),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    isLoading,
    isError,
    activeGenre,
    setactiveGenre,
    handleGenreId,
  };
}
