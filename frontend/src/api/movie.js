import axios from "axios";

export function fetchPopularMovies() {
  return axios.get("/api/movies/popular");
}

export function fetchUpcomingMovies(params) {
  return axios.get(`/api/movies/upcoming`, { params: params });
}

export function fetchNowPlayingMovies(params) {
  return axios.get(`/api/movies/now-playing`, {
    params: params,
  });
}

export function fetchTopRatedMovies(genreId) {
  return axios.get("/api/movies/top-rated", { params: { genreId } });
}

export function fetchMovieDetailsById(id) {
  return axios.get(`/api/movies/details/${id}`);
}

export function fetchMovieOverviewStats() {
  return axios.get("/api/movies/overview-stats");
}

export function fetchSearchMovies(query) {
  return axios.get("/api/movies/search", { params: { q: query } });
}

export function fetchSimilarMovies(id) {
  return axios.get(`/api/movies/similar/${id}`);
}
