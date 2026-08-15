import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchMovieDetailsById,
  fetchMovieOverviewStats,
} from "../api/movie";

const handleFetchMovies = async (fetchFunction) => {
  try {
    const res = await fetchFunction();

    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res.data.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Server error (${error.response.status}):`,
        error.response.data?.message,
      );
      throw new Error(error.response.data?.message);
    } else if (error.request) {
      console.error("No response from server:", error.message);
      throw new Error(
        "Cannot connect to server. Check your internet connection.",
      );
    } else {
      console.error("Request setup error:", error.message);
      throw error;
    }
  }
};

export const getPopularMovies = async () => {
  return handleFetchMovies(fetchPopularMovies);
};
export const getNowPlayingMovies = async () => {
  return handleFetchMovies(fetchNowPlayingMovies);
};
export const getUpcomingMovies = async () => {
  return handleFetchMovies(fetchUpcomingMovies);
};
export const getTopRatedMovies = async () => {
  return handleFetchMovies(fetchTopRatedMovies);
}
export const getMovieDetailsById = async (id) => {
  return handleFetchMovies(() => fetchMovieDetailsById(id));
};
export const getMovieOverviewStats = async () => {
  return handleFetchMovies(fetchMovieOverviewStats);
};