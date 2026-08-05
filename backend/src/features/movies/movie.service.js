// movie.service.js - Xử lý nghiệp vụ cho Movies Feature
const getAllMovies = async () => {
  return [
    { id: 1, title: "Inception", year: 2010 },
    { id: 2, title: "The Matrix", year: 1999 },
  ];
};

const updateMovie = async (id, title, year) => {
  return { id, title, year };
};

module.exports = {
  getAllMovies,
  updateMovie,
};
