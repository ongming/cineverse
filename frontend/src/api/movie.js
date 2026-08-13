import axios from "axios";

export function fetchPopularMovies() {
    return axios.get("/api/movies/popular")
}

export function fetchUpcomingMovies() {
    return axios.get("/api/movies/upcoming")
}

export function fetchNowPlayingMovies() {
    return axios.get("/api/movies/now-playing")
}
export function fetchTopRatedMovies() {
    return axios.get("/api/movies/top-rated")
}