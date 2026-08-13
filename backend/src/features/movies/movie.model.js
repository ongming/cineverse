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

const findUpcomingMovies = async () => {
  const result = await pool.query(`
    SELECT * FROM movies
    WHERE release_date > NOW()
    ORDER BY release_date ASC
  `);
  return result.rows;
};

const findNowPlayingMovies = async () => {
  const result = await pool.query(`
    SELECT * FROM movies
    WHERE release_date <= NOW()
    AND (release_date + INTERVAL '3 months') >= NOW()
    ORDER BY release_date DESC
  `);
  return result.rows;
};

const findTopRatedMovies = async () => {
  const result = await pool.query(`
    SELECT * FROM movies m
    LEFT JOIN LATERAL (
        SELECT file_path AS banner
        FROM movie_images
        WHERE movie_id = m.id
        AND type = 'backdrop'
        ORDER BY display_order ASC, vote_average DESC
        LIMIT 1
    ) mi ON true
    ORDER BY vote_average DESC
    LIMIT 5
  `);
  return result.rows;
}

module.exports = {
  findPopularMovies,
  findUpcomingMovies,
  findNowPlayingMovies,
  findTopRatedMovies,
};
