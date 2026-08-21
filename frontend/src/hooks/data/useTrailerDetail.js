// hooks/data/useTrailerDetail.js
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetailsById, getSimilarMovies } from "../../service/movie.js";
import { calculateROI, formatUSDExact } from "../../utils/revenueUtils.js";
import { getRelatedMovies } from "../../utils/movieRelationUtils.js";
import { useToggleWatchlist } from "./useToggleWatchlist.js";

const fetchTrailerDetail = async (id) => {
  const [movie, similarMovies] = await Promise.all([
    getMovieDetailsById(id),
    getSimilarMovies(id),
  ]);
  return {
    ...movie,
    similarMovies: similarMovies || [],
  };
};

export function useTrailerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleToggle, isBookmarked } = useToggleWatchlist();
  const [isSaved, setIsSaved] = useState(false);
  const [isCastModalOpen, setIsCastModalOpen] = useState(false);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trailer-detail", id],
    queryFn: () => fetchTrailerDetail(id),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
  });
  const movieData = useMemo(() => {
    if (!movie) return null;
    return {
      ...movie,
      roi: calculateROI(movie.budget, movie.revenue),
      budget: formatUSDExact(movie.budget),
      revenue: formatUSDExact(movie.revenue),
      relatedMovies: getRelatedMovies(movie.id, 4),
    };
  }, [movie]);

  const toggleSaveWatchlist = () => {
    setIsSaved((prev) => !prev);
  };
  return {
    movieData,
    isLoading,
    isError,
    isSaved,
    toggleSaveWatchlist,
    isCastModalOpen,
    setIsCastModalOpen,
    navigate,
    handleToggle,
    isBookmarked,
  };
}
