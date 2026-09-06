import axiosClient from "./axiosClient";

export function fetchPopularMovies() {
  return axiosClient.get("/api/movies/popular");
}

export function fetchUpcomingMovies(params) {
  return axiosClient.get(`/api/movies/upcoming`, { params: params });
}

export function fetchNowPlayingMovies(params) {
  return axiosClient.get(`/api/movies/now-playing`, {
    params: params,
  });
}

export function fetchTopRatedMovies(genreId) {
  return axiosClient.get("/api/movies/top-rated", { params: { genreId } });
}

export function fetchMovieDetailsById(id) {
  return axiosClient.get(`/api/movies/details/${id}`);
}

export function fetchMovieOverviewStats() {
  return axiosClient.get("/api/movies/overview-stats");
}

export function fetchSearchMovies(query, page) {
  return axiosClient.get("/api/movies/search", { params: { q: query, page } });
}

export function fetchSimilarMovies(id) {
  return axiosClient.get(`/api/movies/similar/${id}`);
}
