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
    const nowPlayingMovies = await movieService.getNowPlayingMovies(page);
    res.status(200).json({
      success: true,
      data: nowPlayingMovies,
    });
  } catch (error) {
    next(error);
  }
};

const getUpcomingMovies = async (req, res, next) => {
  try {
    const { page } = req.query;
    const upcomingMovies = await movieService.getUpcomingMovies(page);
    res.status(200).json({
      success: true,
      data: upcomingMovies,
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
  try{
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
    const { q } = req.query;
    const movies = await movieService.searchMovies(q);
    res.status(200).json({
      success: true,
      data: movies,
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
};