const pool = require("../../config/database.js");

const findPopularMovies = async () => {
  const result = await pool.query(`
    SELECT
        m.*,
        mi.file_path AS banner,
        t.youtube_key AS youtube_key
    FROM trending_weekly tw
    JOIN movies m ON m.id = tw.movie_id
    LEFT JOIN LATERAL (
        SELECT file_path
        FROM movie_images
        WHERE movie_id = m.id
        AND type = 'backdrop'
        ORDER BY display_order ASC, vote_average DESC
        LIMIT 1
    ) mi ON true
    LEFT JOIN LATERAL (
        SELECT youtube_key
        FROM trailers
        WHERE movie_id = m.id
        ORDER BY id ASC
        LIMIT 1
    ) t ON true
    ORDER BY tw.trending_rank ASC
    LIMIT 6;
  `);
  return result.rows;
};

const findUpcomingMovies = async ({ page }) => {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const LIMIT = 18;
  const OFFSET = (currentPage - 1) * LIMIT;
  const result = await pool.query(
    `
    SELECT * FROM movies
    WHERE release_date > NOW()
    ORDER BY release_date ASC
    LIMIT $1 OFFSET $2;
  `,
    [LIMIT, OFFSET],
  );
  return result.rows;
};

const findNowPlayingMovies = async ({ page = 1 } = {}) => {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const LIMIT = 18;
  const OFFSET = (currentPage - 1) * LIMIT;
  const result = await pool.query(
    `
    SELECT * FROM movies
    WHERE release_date <= NOW()
    AND (release_date + INTERVAL '3 months') >= NOW()
    ORDER BY release_date DESC
    LIMIT $1 OFFSET $2;
  `,
    [LIMIT, OFFSET],
  );
  return result.rows;
};

const findTopRatedMovies = async (genreId) => {
  const result = await pool.query(
    `
    SELECT 
      m.*, 
      COALESCE(mi.banner, m.poster_path) AS banner
    FROM movies m
    LEFT JOIN LATERAL (
        SELECT file_path AS banner
        FROM movie_images
        WHERE movie_id = m.id
        AND type = 'backdrop'
        ORDER BY display_order ASC, vote_average DESC
        LIMIT 1
    ) mi ON true
    WHERE ($1::int IS NULL OR $1::int = ANY(m.genre_ids))
    ORDER BY (m.vote_average * m.vote_count) DESC
    LIMIT 10;
  `,
    [genreId || null],
  );
  return result.rows;
};

const findMovieDetailsById = async (movieId) => {
  const result = await pool.query(
    `
    SELECT 
      gmd.*,
      da.profile_path AS director_path
    FROM get_movie_details_by_id($1) gmd
    LEFT JOIN actors da ON da.name = gmd.director_name
  `,
    [movieId],
  );
  return result.rows[0];
};

const findMovieOverviewStats = async () => {
  const sql = `
    SELECT 
      (SELECT COUNT(*)::int FROM movies) AS total_movies,
      (SELECT COUNT(*)::int FROM actors) AS total_actors,
      (SELECT COALESCE(SUM(vote_count), 0)::bigint FROM movies) AS total_user_reviews,
      (SELECT MAX(created_at) FROM movies) AS last_updated_at;
  `;
  const result = await pool.query(sql);
  return result.rows[0];
};

const findMoviesBySearch = async (query) => {
  if (!query || typeof query !== "string" || !query.trim()) return [];

  const searchPattern = `%${query.trim()}%`;
  const result = await pool.query(
    `
    SELECT * FROM movies
    WHERE title ILIKE $1
       OR overview ILIKE $1
       OR director_name ILIKE $1
    ORDER BY popularity DESC
    LIMIT 20;
  `,
    [searchPattern],
  );
  return result.rows;
};

const findSimilarMovies = async (movieId) => {
  const result = await pool.query(
    `
    SELECT * FROM movies
    WHERE id != $1
      AND genre_ids && (  
        SELECT genre_ids FROM movies WHERE id = $1
      )
    ORDER BY popularity DESC
    LIMIT 10;
  `,
    [movieId],
  );
  return result.rows;
}

module.exports = {
  findPopularMovies,
  findUpcomingMovies,
  findNowPlayingMovies,
  findTopRatedMovies,
  findMovieDetailsById,
  findMovieOverviewStats,
  findMoviesBySearch,
  findSimilarMovies,
};
