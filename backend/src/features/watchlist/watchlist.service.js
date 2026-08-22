const watchlistModel = require("./watchlist.model.js");

const IMAGE_BASE_W500 = "https://image.tmdb.org/t/p/w500";

const formatUrl = (path, baseUrl) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};

const getUserWatchlistService = async (userId, sortType, page, searchQuery = "") => {
  const limit = 18;
  const offset = (parseInt(page || 1) - 1) * limit;
  const cleanUserId = parseInt(userId);
  const SORT_COLUMNS = {
    recent: "w.created_at",
    rating: "m.vote_average",
    year: "m.release_date",
  };

  const items = await watchlistModel.getWatchlistByUserId(
    cleanUserId,
    SORT_COLUMNS[sortType] || SORT_COLUMNS.recent,
    offset,
    limit,
    searchQuery
  );

  return (items || []).map((movie) => ({
    ...movie,
    poster_path: formatUrl(movie.poster_path, IMAGE_BASE_W500),
  }));
};

const getUserWatchlistIdsService = async (userId) => {
  const cleanUserId = parseInt(userId);
  return watchlistModel.getWatchlistIdsByUserId(cleanUserId);
};

const addToWatchlistService = async (userId, movieId) => {
  const cleanUserId = parseInt(userId);
  const cleanMovieId = parseInt(movieId);

  if (!cleanMovieId) {
    throw new Error("Movie ID là bắt buộc.");
  }

  return watchlistModel.addToWatchlist(cleanUserId, cleanMovieId);
};

const removeFromWatchlistService = async (userId, movieId) => {
  const cleanUserId = parseInt(userId);
  const cleanMovieId = parseInt(movieId);

  return watchlistModel.removeFromWatchlist(cleanUserId, cleanMovieId);
};

module.exports = {
  getUserWatchlistService,
  getUserWatchlistIdsService,
  addToWatchlistService,
  removeFromWatchlistService,
};
