// hooks/data/useSearchData.js
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../service/movie.js";

export function useSearchData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search-movies", searchTerm],
    queryFn: () => searchMovies(searchTerm),
    enabled: searchTerm.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const handleSearchChange = (newTerm) => {
    if (newTerm) {
      setSearchParams({ q: newTerm });
    } else {
      setSearchParams({});
    }
  };

  return {
    searchTerm,
    movies,
    isLoading,
    isError,
    handleSearchChange,
  };
}
