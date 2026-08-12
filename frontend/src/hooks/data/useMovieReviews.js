// hooks/data/useMovieReviews.js
import { useState, useMemo } from "react";
import { initialReviews } from "../../data/reviews.js";

export const useMovieReviews = (movieId) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [filterTab, setFilterTab] = useState("YÊU THÍCH NHẤT"); // 'YÊU THÍCH NHẤT' | 'MỚI NHẤT' | 'ĐIỂM CAO NHẤT' | 'ĐIỂM THẤP NHẤT'
  const [newReviewText, setNewReviewText] = useState("");
  const [userRating, setUserRating] = useState(10);
  const [hoverRating, setHoverRating] = useState(0);

  // Filter reviews for specific movie
  const movieReviews = useMemo(() => {
    const numericId = parseInt(movieId, 10);
    return reviews.filter((r) => r.movie_id === numericId);
  }, [reviews, movieId]);

  // Compute aggregated review stats for display
  const reviewStats = useMemo(() => {
    const totalCount = movieReviews.length;
    if (totalCount === 0) {
      return {
        avgScore: "9.0",
        totalCount: 0,
        ratingBars: [80, 60, 40, 20, 10],
      };
    }
    const sum = movieReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avgScore = (sum / totalCount).toFixed(1);

    // Distribution bars for 5 star ratings (5, 4, 3, 2, 1)
    const counts = [0, 0, 0, 0, 0];
    movieReviews.forEach((r) => {
      const idx = Math.min(4, Math.max(0, 5 - Math.ceil(r.rating / 2)));
      counts[idx]++;
    });
    const ratingBars = counts.map((c) => Math.round((c / totalCount) * 100));

    return {
      avgScore,
      totalCount,
      ratingBars,
    };
  }, [movieReviews]);

  // Sorted reviews list based on active tab
  const sortedReviews = useMemo(() => {
    const copy = [...movieReviews];
    switch (filterTab) {
      case "YÊU THÍCH NHẤT":
        return copy.sort((a, b) => b.likes - a.likes);
      case "MỚI NHẤT":
        return copy.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "ĐIỂM CAO NHẤT":
        return copy.sort((a, b) => b.rating - a.rating);
      case "ĐIỂM THẤP NHẤT":
        return copy.sort((a, b) => a.rating - b.rating);
      default:
        return copy;
    }
  }, [movieReviews, filterTab]);

  // Handle Like Toggle on a Review
  const handleToggleLike = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const isLiked = r.userLiked;
          return {
            ...r,
            likes: isLiked ? r.likes - 1 : r.likes + 1,
            userLiked: !isLiked,
          };
        }
        return r;
      })
    );
  };

  // Submit New User Review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newEntry = {
      id: Date.now(),
      movie_id: parseInt(movieId, 10),
      user_name: "Thành viên Cineverse",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      rating: userRating,
      created_at: new Date().toISOString().split("T")[0],
      comment: newReviewText,
      likes: 0,
      userLiked: false,
    };

    setReviews((prev) => [newEntry, ...prev]);
    setNewReviewText("");
  };

  return {
    reviews: sortedReviews,
    reviewStats,
    totalCount: movieReviews.length,
    filterTab,
    setFilterTab,
    newReviewText,
    setNewReviewText,
    userRating,
    setUserRating,
    hoverRating,
    setHoverRating,
    handleToggleLike,
    handleSubmitReview,
  };
};
