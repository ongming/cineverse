import axiosClient from "./axiosClient";

// Fetch list of all category genres
export const fetchCategories = async () => {
  return axiosClient.get("/api/genres");
};

// Fetch movies filtered by category/genre
export const fetchMoviesByCategory = async (params) => {
  return axiosClient.get("/api/movies/by-genre", { params });
};