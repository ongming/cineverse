const pool = require("../../config/database.js");

// 1. Get All Watchlist Items for a User with Movie Details
const getWatchlistByUserId = async (userId) => {
  const result = await pool.query(
    `
    SELECT 
      m.id,
      m.title,
      m.poster_path,
      m.vote_average,
      m.release_date,
      m.runtime,
      w.created_at
    FROM watchlist w
    JOIN movies m ON m.id = w.movie_id
    WHERE w.user_id = $1
    ORDER BY w.created_at DESC;
    `,
    [userId]
  );
  return result.rows;
};

// 2. Add Movie to Watchlist (Ignore duplicates)
const addToWatchlist = async (userId, movieId) => {
  const result = await pool.query(
    `
    INSERT INTO watchlist (user_id, movie_id, created_at)
    VALUES ($1, $2, NOW())
    ON CONFLICT (user_id, movie_id) DO NOTHING
    RETURNING id, user_id, movie_id, created_at;
    `,
    [userId, movieId]
  );
  return result.rows[0];
};

// 3. Remove Movie from Watchlist
const removeFromWatchlist = async (userId, movieId) => {
  const result = await pool.query(
    `
    DELETE FROM watchlist
    WHERE user_id = $1 AND movie_id = $2
    RETURNING id;
    `,
    [userId, movieId]
  );
  return result.rows[0];
};

module.exports = {
  getWatchlistByUserId,
  addToWatchlist,
  removeFromWatchlist,
};
