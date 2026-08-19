import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchMovieDetailsById,
  fetchMovieOverviewStats,
  fetchSearchMovies,
  fetchSimilarMovies,
} from "../api/movie";
import { handleFetch } from "../utils/serviceUtils.js";

export const getPopularMovies = async () => {
  return handleFetch(fetchPopularMovies);
};
export const getNowPlayingMovies = async (params) => {
  return handleFetch(() => fetchNowPlayingMovies(params));
};
export const getUpcomingMovies = async (params) => {
  return handleFetch(() => fetchUpcomingMovies(params));
};
export const getTopRatedMovies = async (genreId) => {
  return handleFetch(() => fetchTopRatedMovies(genreId));
};
export const getMovieDetailsById = async (id) => {
  return handleFetch(() => fetchMovieDetailsById(id));
};
export const getMovieOverviewStats = async () => {
  return handleFetch(fetchMovieOverviewStats);
};
export const searchMovies = async (query) => {
  return handleFetch(() => fetchSearchMovies(query));
};
export const getSimilarMovies = async (id) => {
  return handleFetch(() => fetchSimilarMovies(id));
};