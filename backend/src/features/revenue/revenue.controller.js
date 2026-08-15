const revenueService = require("./revenue.service");

const getTopRevenueMovies = async (req, res, next) => {
  try {
    const { genreId, year, page } = req.query;
    const topRevenueMovies = await revenueService.getTopRevenueMovies({ genreId, year, page });
    res.status(200).json({
      success: true,
      data: topRevenueMovies,
    });
  } catch (error) {
    next(error);
  }
};

const getRevenueStats = async (req, res, next) => {
  try {
    const { genreId, year } = req.query;
    const stats = await revenueService.getRevenueStats({ genreId, year });
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTopRevenueMovies,
  getRevenueStats,
};
