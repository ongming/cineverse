import {
  fetchTopRevenueMovies,
  fetchRevenueStats,
} from "../api/revenue.js";
import { handleFetch } from "../utils/serviceUtils.js";

export const getTopRevenueMovies = async (params) => {
  return handleFetch(() => fetchTopRevenueMovies(params));
};

export const getRevenueStats = async (params) => {
  return handleFetch(() => fetchRevenueStats(params));
};