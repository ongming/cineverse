import {
  fetchTopRevenueMovies,
  fetchRevenueStats,
} from "../api/revenue.js";

const handleFetchData = async (fetchFunction, params) => {
  try {
    const res = await fetchFunction(params);

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

export const getTopRevenueMovies = async (params) => {
  return handleFetchData(fetchTopRevenueMovies, params);
};

export const getRevenueStats = async (params) => {
  return handleFetchData(fetchRevenueStats, params);
};