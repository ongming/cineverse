const reviewService = require("./review.service.js");

const getMovieReviews = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { page, limit } = req.query;

    const data = await reviewService.getMovieReviewsService(
      movieId,
      page,
      limit,
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const userId = req.user.id; // Extracted from JWT token by authMiddleware
    const { movieId, score, comment } = req.body;

    const review = await reviewService.createOrUpdateReviewService(userId, {
      movieId,
      score,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Đánh giá của bạn đã được ghi nhận thành công!",
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMovieReviews,
  createReview,
};
