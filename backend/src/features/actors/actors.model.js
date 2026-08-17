const pool = require("../../config/database.js");
const findTopActors = async (limit = 20) => {
  const result = await pool.query(
    `
    SELECT * FROM actors
    ORDER BY popularity DESC
    LIMIT $1;
  `,
    [limit],
  );
  return result.rows;
};

const findActorById = async (id) => {
  const actorId = Math.max(1, parseInt(id, 10) || 1);
  const result = await pool.query(
    `
    SELECT 
      a.*,
      COALESCE((
        SELECT json_agg(ai.file_path ORDER BY ai.display_order ASC)
        FROM actor_images ai
        WHERE ai.actor_id = a.id
      ), '[]'::json) AS images,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            'id', m.id,
            'title', m.title,
            'poster_path', m.poster_path,
            'character_name', mc.character_name,
            'release_date', m.release_date,
            'vote_average', m.vote_average
          ) ORDER BY m.release_date DESC
        )
        FROM movie_cast mc
        JOIN movies m ON m.id = mc.movie_id
        WHERE mc.actor_id = a.id
      ), '[]'::json) AS movies
    FROM actors a
    WHERE a.id = $1;
  `,
    [actorId],
  );
  return result.rows[0];
};

const findActorTrailerById = async (trailerId) => {
  const trailerid = Math.max(1, parseInt(trailerId, 10) || 1);
  const result = await pool.query(
    `
    SELECT mc.*, a.name, a.profile_path
    FROM movie_cast mc
    JOIN actors a ON mc.actor_id = a.id
    WHERE mc.movie_id = $1
    ORDER BY mc.cast_order ASC
    `,
    [trailerid],
  );
  return result.rows;
};

module.exports = {
  findTopActors,
  findActorById,
  findActorTrailerById,
};
