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
    const nowPlayingMovies = await movieService.getNowPlayingMovies();
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
    const upcomingMovies = await movieService.getUpcomingMovies();
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
    const topRatedMovies = await movieService.getTopRatedMovies();
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

module.exports = {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieDetailsById,
};