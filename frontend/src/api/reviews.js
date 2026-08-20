import axios from "axios";

export const fetchReviewsByMovieId = async (movieId, page = 1) => {
  return axios.get(`/api/reviews/movie/${movieId}?page=${page}&limit=10`);
};

export const fetchCreateReview = async (reviewData) => {
  return axios.post("/api/reviews", reviewData);
};
