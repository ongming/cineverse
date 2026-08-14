const genreService = require("./genre.service");

const getAllGenres = async (req, res, next) => {
  try {
    const genres = await genreService.getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGenres,
};