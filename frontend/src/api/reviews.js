import axiosClient from "./axiosClient";

export const fetchReviewsByMovieId = async (movieId, page = 1) => {
  return axiosClient.get(`/api/reviews/movie/${movieId}?page=${page}&limit=10`);
};

export const fetchCreateReview = async (reviewData) => {
  return axiosClient.post("/api/reviews", reviewData);
};
