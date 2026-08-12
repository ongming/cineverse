// hooks/data/useTrailerDetail.js
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovies } from "./useMovies.js";
import { calculateROI, formatUSDExact } from "../../utils/revenueUtils.js";
import { getMovieCast, getRelatedMovies } from "../../utils/movieRelationUtils.js";

export const useTrailerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Watchlist state & Modal state
  const [isSaved, setIsSaved] = useState(false);
  const [isCastModalOpen, setIsCastModalOpen] = useState(false);

  // Query master movies list
  const { data: movies = [], isLoading, isError } = useMovies();

  // Find movie matching URL parameter ID
  const movie = useMemo(() => {
    const numericId = parseInt(id, 10);
    const found = movies.find((m) => m.id === numericId);
    return found || movies[0] || null;
  }, [id, movies]);

  // Derived movie financial and cast calculations
  const roi = useMemo(() => {
    if (!movie) return 0;
    return calculateROI(movie.budget, movie.revenue);
  }, [movie]);

  const formattedBudget = useMemo(() => {
    if (!movie) return "$0";
    return formatUSDExact(movie.budget);
  }, [movie]);

  const formattedRevenue = useMemo(() => {
    if (!movie) return "$0";
    return formatUSDExact(movie.revenue);
  }, [movie]);

  const movieCast = useMemo(() => {
    if (!movie) return [];
    return getMovieCast(movie.id);
  }, [movie]);

  const relatedMovies = useMemo(() => {
    if (!movie) return [];
    return getRelatedMovies(movie.id, 4);
  }, [movie]);

  const toggleSaveWatchlist = () => {
    setIsSaved((prev) => !prev);
  };

  return {
    id,
    movie,
    movieCast,
    isLoading,
    isError,
    roi,
    formattedBudget,
    formattedRevenue,
    relatedMovies,
    isSaved,
    toggleSaveWatchlist,
    isCastModalOpen,
    setIsCastModalOpen,
    navigate,
  };
};
