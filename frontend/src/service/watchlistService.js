import {
  fetchWatchlist,
  fetchWatchlistIds,
  fetchAddToWatchlist,
  fetchRemoveFromWatchlist,
} from "../api/watchlist.js";
import { handleFetch } from "../utils/serviceUtils.js";

// 1. Get Watchlist Service (Paginated)
export const getWatchlist = async (params) => {
  return handleFetch(() => fetchWatchlist(params));
};

// 2. Get Watchlist Movie IDs Service (Unpaginated Array)
export const getWatchlistIds = async () => {
  return handleFetch(() => fetchWatchlistIds());
};

// 3. Add to Watchlist Service
export const addToWatchlist = async (movieId) => {
  return handleFetch(() => fetchAddToWatchlist(movieId));
};

// 4. Remove from Watchlist Service
export const removeFromWatchlist = async (movieId) => {
  return handleFetch(() => fetchRemoveFromWatchlist(movieId));
};
