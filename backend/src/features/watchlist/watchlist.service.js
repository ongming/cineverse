const watchlistModel = require("./watchlist.model.js");

const IMAGE_BASE_W500 = "https://image.tmdb.org/t/p/w500";

const formatUrl = (path, baseUrl) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};

const getUserWatchlistService = async (userId, sortType, page, searchQuery = "") => {
  const PAGE_SIZE = 18;
  const FETCH_LIMIT = PAGE_SIZE + 1;
  const offset = (parseInt(page || 1) - 1) * PAGE_SIZE;
  const cleanUserId = parseInt(userId);
  const SORT_COLUMNS = {
    recent: "w.created_at",
    rating: "m.vote_average",
    year: "m.release_date",
  };

  const rawRows = await watchlistModel.getWatchlistByUserId(
    cleanUserId,
    SORT_COLUMNS[sortType] || SORT_COLUMNS.recent,
    offset,
    FETCH_LIMIT,
    searchQuery
  );

  const hasNextPage = (rawRows || []).length > PAGE_SIZE;
  const slicedMovies = hasNextPage ? rawRows.slice(0, PAGE_SIZE) : rawRows;

  const movies = (slicedMovies || []).map((movie) => ({
    ...movie,
    poster_path: formatUrl(movie.poster_path, IMAGE_BASE_W500),
  }));

  return { watchlist: movies, hasNextPage };
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
