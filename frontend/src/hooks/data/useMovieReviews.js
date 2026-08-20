// hooks/data/useMovieReviews.js
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReviewsByMovieId, createReview } from "../../service/review.js";

export const useMovieReviews = (movieId) => {
  const [newReviewText, setNewReviewText] = useState("");
  const [userRating, setUserRating] = useState(10);
  const [hoverRating, setHoverRating] = useState(0);
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery({
    queryKey: ["movieReviews", movieId],
    queryFn: () => getReviewsByMovieId(movieId),
    enabled: !!movieId,
  });

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["movieReviews", movieId]);
    },
  });

  const serverSummary = reviewsQuery.data?.summary;
  const serverReviews = reviewsQuery.data?.reviews || [];

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    await createReviewMutation.mutateAsync({
      movieId: parseInt(movieId, 10),
      score: userRating,
      comment: newReviewText,
    });

    setNewReviewText("");
  };

  return {
    reviews: serverReviews,
    summary: serverSummary,
    isLoading: reviewsQuery.isLoading,
    newReviewText,
    setNewReviewText,
    userRating,
    setUserRating,
    hoverRating,
    setHoverRating,
    handleSubmitReview,
    isSubmitting: createReviewMutation.isPending,
  };
};
