// hooks/useMovieReviews.js
import { useState, useMemo } from "react";
import { initialReviews } from "../../data/reviews.js";

export const useMovieReviews = (movieId) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [filterTab, setFilterTab] = useState("YÊU THÍCH NHẤT"); // 'YÊU THÍCH NHẤT' | 'MỚI NHẤT' | 'ĐIỂM CAO NHẤT' | 'ĐIỂM THẤP NHẤT'
  const [newReviewText, setNewReviewText] = useState("");
  const [userRating, setUserRating] = useState(10);
  const [hoverRating, setHoverRating] = useState(0);
  const [likedReviews, setLikedReviews] = useState({});

  // Filter & sort reviews for current movie
  const filteredReviews = useMemo(() => {
    const numericId = Number(movieId);
    let list = reviews.filter((r) => r.movie_id === numericId);
    if (list.length === 0) {
      list = [...reviews];
    }

    return [...list].sort((a, b) => {
      if (filterTab === "YÊU THÍCH NHẤT" || filterTab === "MOST LIKED") {
        return (b.likes_count || 0) - (a.likes_count || 0);
      }
      if (filterTab === "MỚI NHẤT" || filterTab === "NEWEST") {
        return b.id - a.id;
      }
      if (filterTab === "ĐIỂM CAO NHẤT" || filterTab === "HIGHEST RATING") {
        return b.rating - a.rating;
      }
      if (filterTab === "ĐIỂM THẤP NHẤT" || filterTab === "LOWEST RATING") {
        return a.rating - b.rating;
      }
      return 0;
    });
  }, [reviews, movieId, filterTab]);

  // Overall average rating calculation
  const reviewStats = useMemo(() => {
    if (filteredReviews.length === 0) {
      return { avgScore: 8.8, totalCount: 12, ratingBars: [85, 10, 3, 1, 1] };
    }

    const total = filteredReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgScore = (total / filteredReviews.length).toFixed(1);

    // Distribution breakdown
    const distribution = [0, 0, 0, 0, 0];
    filteredReviews.forEach((r) => {
      if (r.rating >= 9) distribution[0]++;
      else if (r.rating >= 7) distribution[1]++;
      else if (r.rating >= 5) distribution[2]++;
      else if (r.rating >= 3) distribution[3]++;
      else distribution[4]++;
    });

    const ratingBars = distribution.map((count) =>
      Math.round((count / filteredReviews.length) * 100)
    );

    return {
      avgScore,
      totalCount: filteredReviews.length,
      ratingBars,
    };
  }, [filteredReviews]);

  // Submit new review action
  const handleSendReview = (e) => {
    if (e) e.preventDefault();
    if (!newReviewText.trim()) return;

    const newReview = {
      id: Date.now(),
      movie_id: Number(movieId),
      author: "Bạn (Thành viên Cineverse)",
      avatar: "https://i.pravatar.cc/150?img=60",
      badge: "THÀNH VIÊN",
      rating: userRating,
      time: "Vừa xong",
      content: newReviewText.trim(),
      likes_count: 0,
      replies_count: 0,
    };

    setReviews((prev) => [newReview, ...prev]);
    setNewReviewText("");
  };

  // Toggle Like review
  const toggleLikeReview = (reviewId) => {
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const isCurrentlyLiked = likedReviews[reviewId];
          return {
            ...r,
            likes_count: isCurrentlyLiked
              ? r.likes_count - 1
              : r.likes_count + 1,
          };
        }
        return r;
      })
    );
  };

  return {
    reviews: filteredReviews,
    reviewStats,
    filterTab,
    setFilterTab,
    newReviewText,
    setNewReviewText,
    userRating,
    setUserRating,
    hoverRating,
    setHoverRating,
    likedReviews,
    handleSendReview,
    toggleLikeReview,
  };
};
