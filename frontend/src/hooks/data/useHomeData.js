// hooks/data/useHomeData.js
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { movies } from "../../data/movies.js";
import { actors } from "../../data/actors.js";
import { movie_images } from "../../data/movieImages.js";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieOverviewStats,
} from "../../service/movie.js";
import { getTopActors } from "../../service/actor.js";

const fetchHomeData = async (page) => {
  // 1. Parallel fetch all 5 endpoints concurrently
  const [heroMovies, nowPlaying, upcoming, topRated, overviewStats, topActors] =
    await Promise.all([
      getPopularMovies(),
      getNowPlayingMovies({
        page: page,
      }),
      getUpcomingMovies({
        page: page,
      }),
      getTopRatedMovies(),
      getMovieOverviewStats(),
      getTopActors(),
    ]);

  console.log("Fetched home data:", {
    heroMovies,
    nowPlaying,
    upcoming,
    topRated,
    overviewStats,
    topActors,
  });

  // 3. Featured Single Movie of the Week
  const featuredMovie = heroMovies ? heroMovies[0] : null;

  // 4. Popular Actors List
  const popularActors = actors ? actors.slice(0, 10) : [];

  return {
    heroMovies,
    nowPlaying,
    topRated,
    upcoming,
    featuredMovie,
    popularActors,
    overviewStats,
    topActors,
  };
};

export function useHomeData() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["home-data", page],
    queryFn: () => fetchHomeData(page),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
  });

  return {
    data,
    isLoading,
    isError,
    page,
    setPage,
  };
}
