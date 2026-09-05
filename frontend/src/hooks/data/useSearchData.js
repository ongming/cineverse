import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../service/movie.js";

export function useSearchData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [page, setPage] = useState(1);

  // Reset pagination to Page 1 whenever search query changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

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
    setPage(1);
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
