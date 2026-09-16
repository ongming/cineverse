const genreModel = require("./genre.model");
const NotFoundError = require("../../errors/NotFoundError");

const getAllGenres = async () => {
  const genres = await genreModel.findAllGenres();
    if (!genres || genres.length === 0) {
    throw new NotFoundError("No genres found");
  }
  return genres;
};

module.exports = {
  getAllGenres,
};
