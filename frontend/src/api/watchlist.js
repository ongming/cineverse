import axiosClient from "./axiosClient";

// 1. Fetch User Watchlist (Paginated)
export const fetchWatchlist = async (params) => {
  return axiosClient.get("/api/watchlist", { params });
};

// 2. Fetch User Watchlist Movie IDs (Fast Unpaginated Array)
export const fetchWatchlistIds = async () => {
  return axiosClient.get("/api/watchlist/ids");
};

// 3. Add Movie to Watchlist
export const fetchAddToWatchlist = async (movieId) => {
  return axiosClient.post("/api/watchlist", { movieId });
};

// 4. Remove Movie from Watchlist
export const fetchRemoveFromWatchlist = async (movieId) => {
  return axiosClient.delete(`/api/watchlist/${movieId}`);
};
