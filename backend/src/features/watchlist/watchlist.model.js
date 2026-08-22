const pool = require("../../config/database.js");

// 1. Get All Watchlist Items for a User with Movie Details & Search Filter
const getWatchlistByUserId = async (
  userId,
  sortType = "w.created_at",
  offset = 0,
  limit = 18,
  searchQuery = ""
) => {
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
      AND ($4::text IS NULL OR $4::text = '' OR m.title ILIKE '%' || $4 || '%')
    ORDER BY ${sortType} DESC
    LIMIT $2 OFFSET $3;
    `,
    [userId, limit, offset, searchQuery]
  );
  return result.rows;
};

// 2. Get All Watchlist Movie IDs for a User (Unpaginated Lightweight Array for Bookmark Icons)
const getWatchlistIdsByUserId = async (userId) => {
  const result = await pool.query(
    `
    SELECT movie_id 
    FROM watchlist 
    WHERE user_id = $1 
    ORDER BY created_at DESC;
    `,
    [userId]
  );
  return result.rows.map((row) => row.movie_id);
};

// 3. Add Movie to Watchlist (Ignore duplicates)
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

// 4. Remove Movie from Watchlist
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
  getWatchlistIdsByUserId,
  addToWatchlist,
  removeFromWatchlist,
};
