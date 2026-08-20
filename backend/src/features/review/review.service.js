const reviewModel = require("./review.model.js");

const getMovieReviewsService = async (movieId, page = 1, limit = 10) => {
  const cleanMovieId = parseInt(movieId);
  const cleanPage = Math.max(1, parseInt(page));
  const cleanLimit = Math.max(1, Math.min(50, parseInt(limit)));
  const offset = (cleanPage - 1) * cleanLimit;

  // Fetch summary stats & review list in parallel
  const [summary, reviews] = await Promise.all([
    reviewModel.getMovieRatingSummary(cleanMovieId),
    reviewModel.getReviewsByMovieId(cleanMovieId, cleanLimit, offset),
  ]);

  const total = parseInt(summary.totalReviews) || 0;
  const star5Count = parseInt(summary.star5) || 0;
  const star4Count = parseInt(summary.star4) || 0;
  const star3Count = parseInt(summary.star3) || 0;
  const star2Count = parseInt(summary.star2) || 0;
  const star1Count = parseInt(summary.star1) || 0;

  return {
    summary: {
      averageScore: parseFloat(summary.averageScore) || 0.0,
      totalReviews: total,
      distribution: {
        5: {
          count: star5Count,
          percent: total > 0 ? parseFloat(((star5Count / total) * 100).toFixed(1)) : 0,
        },
        4: {
          count: star4Count,
          percent: total > 0 ? parseFloat(((star4Count / total) * 100).toFixed(1)) : 0,
        },
        3: {
          count: star3Count,
          percent: total > 0 ? parseFloat(((star3Count / total) * 100).toFixed(1)) : 0,
        },
        2: {
          count: star2Count,
          percent: total > 0 ? parseFloat(((star2Count / total) * 100).toFixed(1)) : 0,
        },
        1: {
          count: star1Count,
          percent: total > 0 ? parseFloat(((star1Count / total) * 100).toFixed(1)) : 0,
        },
      },
    },
    reviews,
    pagination: {
      currentPage: cleanPage,
      limit: cleanLimit,
      hasMore: reviews.length === cleanLimit,
    },
  };
};

/**
 * 2. Add or Update User Review (Upsert)
 */
const createOrUpdateReviewService = async (userId, { movieId, score, comment }) => {
  const cleanMovieId = parseInt(movieId);
  const cleanScore = parseFloat(score);
  const cleanComment = comment ? comment.trim() : "";

  // Validate Score (Must be between 1 and 10)
  if (isNaN(cleanScore) || cleanScore < 1 || cleanScore > 10) {
    throw new Error("Điểm đánh giá phải từ 1 đến 10.");
  }

  // Upsert review into PostgreSQL database
  const review = await reviewModel.upsertReview(
    userId,
    cleanMovieId,
    cleanScore,
    cleanComment
  );

  return review;
};

module.exports = {
  getMovieReviewsService,
  createOrUpdateReviewService,
};