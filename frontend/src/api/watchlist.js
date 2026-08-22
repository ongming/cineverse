import axios from "axios";

// 1. Fetch User Watchlist (Paginated)
export const fetchWatchlist = async (params) => {
  return axios.get("/api/watchlist", { params });
};

// 2. Fetch User Watchlist Movie IDs (Fast Unpaginated Array)
export const fetchWatchlistIds = async () => {
  return axios.get("/api/watchlist/ids");
};

// 3. Add Movie to Watchlist
export const fetchAddToWatchlist = async (movieId) => {
  return axios.post("/api/watchlist", { movieId });
};

// 4. Remove Movie from Watchlist
export const fetchRemoveFromWatchlist = async (movieId) => {
  return axios.delete(`/api/watchlist/${movieId}`);
};
