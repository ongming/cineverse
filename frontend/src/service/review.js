import { fetchReviewsByMovieId, fetchCreateReview } from "../api/reviews.js";
import { handleFetch } from "../utils/serviceUtils.js";

export const getReviewsByMovieId = async (movieId, page = 1) => {
  return handleFetch(() => fetchReviewsByMovieId(movieId, page));
};

export const createReview = async (reviewData) => {
  return handleFetch(() => fetchCreateReview(reviewData));
};
