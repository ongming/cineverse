import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../service/movie.js";

export function useSearchData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [page, setPage] = useState(1);

  const {
    data = { movies: [], hasNextPage: false },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search-movies", searchTerm, page],
    queryFn: () => searchMovies(searchTerm, page),
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
    movies: data?.movies || [],
    hasNextPage: data?.hasNextPage || false,
    isLoading,
    isError,
    handleSearchChange,
    page,
    setPage,
  };
}
