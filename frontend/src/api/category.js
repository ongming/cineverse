import axios from "axios";

// Fetch list of all category genres
export const fetchCategories = async () => {
  return axios.get("/api/genres");
};

// Fetch movies filtered by category/genre
export const fetchMoviesByCategory = async (params) => {
  return axios.get("/api/movies/by-genre", { params });
};