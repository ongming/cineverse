import {
  fetchWatchlist,
  fetchAddToWatchlist,
  fetchRemoveFromWatchlist,
} from "../api/watchlist.js";
import { handleFetch } from "../utils/serviceUtils.js";

// 1. Get Watchlist Service
export const getWatchlist = async () => {
  return handleFetch(() => fetchWatchlist());
};

// 2. Add to Watchlist Service
export const addToWatchlist = async (movieId) => {
  return handleFetch(() => fetchAddToWatchlist(movieId));
};

// 3. Remove from Watchlist Service
export const removeFromWatchlist = async (movieId) => {
  return handleFetch(() => fetchRemoveFromWatchlist(movieId));
};
