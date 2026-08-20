const pool = require("../../config/database.js");

// 1. Get All Reviews for a Movie with User Details
const getReviewsByMovieId = async (movieId, limit = 10, offset = 0) => {
  const result = await pool.query(
    `
    SELECT 
      r.id,
      r.user_id AS "userId",
      u.username,
      u.avatar_url AS "avatarUrl",
      r.score,
      r.comment,
      r.created_at AS "createdAt"
    FROM ratings r
    JOIN users u ON u.id = r.user_id
    WHERE r.movie_id = $1
    ORDER BY r.created_at DESC
    LIMIT $2 OFFSET $3;
    `,
    [movieId, limit, offset]
  );
  return result.rows;
};

// 2. Get Rating Statistics (Average Score out of 10, Total Reviews, Score Distribution)
const getMovieRatingSummary = async (movieId) => {
  const result = await pool.query(
    `
    SELECT 
      COALESCE(ROUND(AVG(score), 1), 0.0) AS "averageScore",
      COUNT(id)::int AS "totalReviews",
      COUNT(CASE WHEN score >= 9 THEN 1 END)::int AS "star5",
      COUNT(CASE WHEN score >= 7 AND score < 9 THEN 1 END)::int AS "star4",
      COUNT(CASE WHEN score >= 5 AND score < 7 THEN 1 END)::int AS "star3",
      COUNT(CASE WHEN score >= 3 AND score < 5 THEN 1 END)::int AS "star2",
      COUNT(CASE WHEN score < 3 THEN 1 END)::int AS "star1"
    FROM ratings
    WHERE movie_id = $1;
    `,
    [movieId]
  );
  return result.rows[0];
};

// 3. Upsert Review (Create or Update if user already reviewed this movie)
const upsertReview = async (userId, movieId, score, comment) => {
  const result = await pool.query(
    `
    INSERT INTO ratings (user_id, movie_id, score, comment, updated_at)
    VALUES ($1, $2, $3, $4, NOW())
    ON CONFLICT (user_id, movie_id) 
    DO UPDATE SET 
      score = EXCLUDED.score,
      comment = EXCLUDED.comment,
      updated_at = NOW()
    RETURNING id, user_id, movie_id, score, comment, created_at, updated_at;
    `,
    [userId, movieId, score, comment]
  );
  return result.rows[0];
};

module.exports = {
  getReviewsByMovieId,
  getMovieRatingSummary,
  upsertReview,
};