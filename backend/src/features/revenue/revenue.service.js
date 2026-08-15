const revenueModel = require("./revenue.model");

const IMAGE_BASE_W500 = "https://image.tmdb.org/t/p/w500";

const formatUrl = (path, baseUrl) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};

const getTopRevenueMovies = async ({ genreId, year, page }) => {
  const movies = await revenueModel.findTopRevenueMovies({ genreId, year, page });
  return movies.map((m) => ({
    ...m,
    poster_path: formatUrl(m.poster_path, IMAGE_BASE_W500),
  }));
};

const getRevenueStats = async ({ genreId, year }) => {
  const stats = await revenueModel.findRevenueStats({ genreId, year });
  if (stats) {
    if (Array.isArray(stats.top_5_movies)) {
      stats.top_5_movies = stats.top_5_movies.map((m) => ({
        ...m,
        poster_path: formatUrl(m.poster_path, IMAGE_BASE_W500),
      }));
    }
    if (Array.isArray(stats.profit_kings)) {
      stats.profit_kings = stats.profit_kings.map((m) => ({
        ...m,
        poster_path: formatUrl(m.poster_path, IMAGE_BASE_W500),
      }));
    }
    if (Array.isArray(stats.box_office_flops)) {
      stats.box_office_flops = stats.box_office_flops.map((m) => ({
        ...m,
        poster_path: formatUrl(m.poster_path, IMAGE_BASE_W500),
      }));
    }
  }
  return stats;
};

module.exports = {
  getTopRevenueMovies,
  getRevenueStats,
};
