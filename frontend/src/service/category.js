import { fetchCategories, fetchMoviesByCategory } from "../api/category.js";
import { handleFetch } from "../utils/serviceUtils.js";

// Fetch list of all categories
export const getCategories = async () => {
  return handleFetch(fetchCategories);
};

// Fetch movies by category (NO _Service suffix!)
export const getMoviesByCategory = async (params) => {
  return handleFetch(() => fetchMoviesByCategory(params));
};
