const movieService = require("./movie.service");

const getPopularMovies = async (req, res, next) => {
  try {
    const popularMovies = await movieService.getPopularMovies();
    res.status(200).json({
      success: true,
      data: popularMovies,
    });
  } catch (error) {
    next(error);
  }
};

const getNowPlayingMovies = async (req, res, next) => {
  try {
    const { page } = req.query;
    const { movies, hasNextPage } = await movieService.getNowPlayingMovies(page);
    res.status(200).json({
      success: true,
      data: {
        movies,
        hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUpcomingMovies = async (req, res, next) => {
  try {
    const { page } = req.query;
    const { movies, hasNextPage } = await movieService.getUpcomingMovies(page);
    res.status(200).json({
      success: true,
      data: {
        movies,
        hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTopRatedMovies = async (req, res, next) => {
  try {
    const { genreId } = req.query;
    const topRatedMovies = await movieService.getTopRatedMovies(genreId);
    res.status(200).json({
      success: true,
      data: topRatedMovies,
    });
  } catch (error) {
    next(error);
  }
};

const getMovieDetailsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDetails = await movieService.getMovieDetailsById(id);
    res.status(200).json({
      success: true,
      data: movieDetails,
    });
  } catch (error) {
    next(error);
  }
};

const getMovieOverviewStats = async (req, res, next) => {
  try {
    const stats = await movieService.getMovieOverviewStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const searchMovies = async (req, res, next) => {
  try {
    const { q, page } = req.query;
    const { movies, hasNextPage } = await movieService.searchMovies(q, page);
    res.status(200).json({
      success: true,
      data: {
        movies,
        hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSimilarMovies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const similarMovies = await movieService.getSimilarMovies(id);
    res.status(200).json({
      success: true,
      data: similarMovies,
    });
  } catch (error) {
    next(error);
  }
};

const getMoviesByGenre = async (req, res, next) => {
  try {
    const { genreName, genreId, page } = req.query;
    const { movies, hasNextPage } = await movieService.getMoviesByGenre({ genreName, genreId, page });
    res.status(200).json({
      success: true,
      data: {
        movies,
        hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieDetailsById,
  getMovieOverviewStats,
  searchMovies,
  getSimilarMovies,
  getMoviesByGenre,
};
