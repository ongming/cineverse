// hooks/data/useHomeData.js
import { useQuery } from "@tanstack/react-query";
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

const fetchHomeData = async () => {
  // 1. Parallel fetch all 3 endpoints concurrently
  const [heroMovies, nowPlaying, upcoming, topRated, overviewStats] = await Promise.all([
    getPopularMovies(),
    getNowPlayingMovies(),
    getUpcomingMovies(),
    getTopRatedMovies(),
    getMovieOverviewStats(),
  ]);
  console.log("Fetched home data:", {
    heroMovies,
    nowPlaying,
    upcoming,
    topRated,
    overviewStats,
  });
  // 3. Featured Single Movie of the Week
  const featuredMovie = heroMovies[0];

  // 4. Popular Actors List
  const popularActors = actors.slice(0, 10);

  // 5. Platform Key Stats
  const stats = {
    totalMovies: 1240,
    totalActors: 8500,
    userReviews: 45200,
    lastUpdated: "Vừa xong",
  };

  return {
    heroMovies,
    nowPlaying,
    topRated,
    upcoming,
    featuredMovie,
    popularActors,
    overviewStats,
  };
};

export function useHomeData() {
  return useQuery({
    queryKey: ["home-data"],
    queryFn: fetchHomeData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
  });
}
