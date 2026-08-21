const watchlistService = require("./watchlist.service.js");

const getWatchlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const watchlist = await watchlistService.getUserWatchlistService(userId);

    res.status(200).json({
      success: true,
      data: watchlist,
    });
  } catch (error) {
    next(error);
  }
};

const addToWatchlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.body;

    const item = await watchlistService.addToWatchlistService(userId, movieId);

    res.status(201).json({
      success: true,
      message: "Đã thêm phim vào danh sách theo dõi thành công!",
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

const removeFromWatchlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    await watchlistService.removeFromWatchlistService(userId, movieId);

    res.status(200).json({
      success: true,
      message: "Đã xóa phim khỏi danh sách theo dõi!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};
