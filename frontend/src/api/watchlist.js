import axios from "axios";

// 1. Fetch User Watchlist
export const fetchWatchlist = async () => {
  return axios.get("/api/watchlist");
};

// 2. Add Movie to Watchlist
export const fetchAddToWatchlist = async (movieId) => {
  return axios.post("/api/watchlist", { movieId });
};

// 3. Remove Movie from Watchlist
export const fetchRemoveFromWatchlist = async (movieId) => {
  return axios.delete(`/api/watchlist/${movieId}`);
};
