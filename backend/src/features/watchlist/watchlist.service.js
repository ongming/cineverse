const watchlistModel = require("./watchlist.model.js");

const IMAGE_BASE_W500 = "https://image.tmdb.org/t/p/w500";

const formatUrl = (path, baseUrl) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};

const getUserWatchlistService = async (userId) => {
  const cleanUserId = parseInt(userId);
  const items = await watchlistModel.getWatchlistByUserId(cleanUserId);

  return (items || []).map((movie) => {
    const fullPoster = formatUrl(movie.poster_path, IMAGE_BASE_W500);

    return {
      ...movie,
      poster_path: fullPoster,
    };
  });
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
  addToWatchlistService,
  removeFromWatchlistService,
};
