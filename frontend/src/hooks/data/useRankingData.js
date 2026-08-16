// hooks/data/useRankingData.js
import { useState, useMemo } from "react";
import { movies as mockMovies } from "../../data/movies.js";
import { useTopRateMovies } from "../../hooks/data/useTopRateMovies.js";
import { useCategory } from "../../hooks/data/useCategory.js";

export function useRankingData() {
  const {
    data: topRatedMovies,
    isLoading: isTopRatedLoading,
    isError: isTopRatedError,
    activeGenre,
    setactiveGenre,
    handleGenreId,
  } = useTopRateMovies();
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategory();
  return {
    topRatedMovies,
    categoryData,
    isLoading: isCategoryLoading || isTopRatedLoading,
    isError: isCategoryError || isTopRatedError,
    activeGenre,
    setactiveGenre,
    handleGenreId,
  };
}
