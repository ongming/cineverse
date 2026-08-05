// movie.controller.js - Xử lý Controller cho Movies Feature
const movieService = require("./movie.service");
const { successResponse } = require("../../utils/apiResponse");

const getMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getAllMovies();
    return successResponse(res, "Fetched movies list successfully", movies);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, year } = req.body;
    const updated = await movieService.updateMovie(id, title, year);
    return successResponse(res, "Movie updated successfully", updated);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMovies,
  updateMovie,
};
