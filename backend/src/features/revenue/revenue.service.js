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
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const PAGE_SIZE = 20;
  const FETCH_LIMIT = PAGE_SIZE + 1;
  const offset = (currentPage - 1) * PAGE_SIZE;

  const rawRows = await revenueModel.findTopRevenueMovies({
    genreId,
    year,
    limit: FETCH_LIMIT,
    offset,
  });

  const hasNextPage = rawRows.length > PAGE_SIZE;
  const slicedMovies = hasNextPage ? rawRows.slice(0, PAGE_SIZE) : rawRows;

  const movies = slicedMovies.map((m) => ({
    ...m,
    poster_path: formatUrl(m.poster_path, IMAGE_BASE_W500),
  }));

  return { movies, hasNextPage };
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
