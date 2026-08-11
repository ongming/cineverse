// hooks/useTrailerDetail.js
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovies } from "../useMovies.js";
import { calculateROI, formatUSDExact } from "../../utils/revenueUtils.js";
import { getMovieCast } from "../../utils/movieRelationUtils.js";

export const useTrailerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isCastModalOpen, setIsCastModalOpen] = useState(false);

  // Fetch movies via React Query
  const { data: movies = [], isLoading, isError } = useMovies();

  // Find movie by ID
  const movie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    const numericId = parseInt(id, 10);
    return movies.find((m) => m.id === numericId);
  }, [id, movies]);

  // Compute full relational cast list (actors with IDs and character names)
  const movieCast = useMemo(() => {
    if (!movie) return [];
    return getMovieCast(movie.id);
  }, [movie]);

  // Compute financial metric ROI % using shared helper
  const roi = useMemo(() => {
    if (!movie) return 0;
    return calculateROI(movie.budget, movie.revenue);
  }, [movie]);

  // Formatted Budget and Revenue strings
  const formattedBudget = useMemo(() => {
    return movie?.budget ? formatUSDExact(movie.budget) : "$190M";
  }, [movie]);

  const formattedRevenue = useMemo(() => {
    return movie?.revenue ? formatUSDExact(movie.revenue) : "$711M";
  }, [movie]);

  // Related movies recommendation list ("More Like This")
  const relatedMovies = useMemo(() => {
    if (!movie || !movies) return [];
    return movies
      .filter(
        (m) =>
          m.id !== movie.id &&
          m.genre?.some((g) => movie.genre?.includes(g))
      )
      .slice(0, 4);
  }, [movie, movies]);

  // Handle Watchlist toggle
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
