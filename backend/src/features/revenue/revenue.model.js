const pool = require("../../config/database.js");

const findTopRevenueMovies = async ({ genreId, year, page }) => {
  const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
  const LIMIT = 20;
  const OFFSET = (parsedPage - 1) * LIMIT;

  let genreQuery = "";
  let yearQuery = "";

  if (genreId && genreId !== "ALL") {
    const parsedGenreId = parseInt(genreId, 10);
    genreQuery = ` AND ${parsedGenreId} = ANY (m.genre_ids)`;
  }

  if (year && year !== "ALL") {
    const parsedYear = parseInt(year, 10);
    yearQuery = ` AND EXTRACT(YEAR FROM release_date) = ${parsedYear}`;
  }

  const sql = `
    SELECT 
      id, 
      title, 
      budget, 
      revenue, 
      release_date,
      poster_path
    FROM movies m
    WHERE budget > 0 ${genreQuery} ${yearQuery}
    ORDER BY revenue DESC 
    LIMIT $1 OFFSET $2;
  `;
  const result = await pool.query(sql, [LIMIT, OFFSET]);
  return result.rows;
};

const findRevenueStats = async ({ genreId, year }) => {
  let genreQuery = "";
  let yearQuery = "";
  let subGenreQuery = "";
  let subYearQuery = "";

  if (genreId && genreId !== "ALL") {
    const parsedGenreId = parseInt(genreId, 10);
    if (!isNaN(parsedGenreId)) {
      genreQuery = ` AND ${parsedGenreId} = ANY (m.genre_ids)`;
      subGenreQuery = ` AND ${parsedGenreId} = ANY (s.genre_ids)`;
    }
  }

  if (year && year !== "ALL") {
    const parsedYear = parseInt(year, 10);
    if (!isNaN(parsedYear)) {
      yearQuery = ` AND EXTRACT(YEAR FROM release_date) = ${parsedYear}`;
      subYearQuery = ` AND EXTRACT(YEAR FROM s.release_date) = ${parsedYear}`;
    }
  }

  const sql = `
    SELECT 
      COALESCE(SUM(m.revenue), 0) AS total_revenue,
      COALESCE(SUM(m.budget), 0) AS total_budget,
      COUNT(*)::int AS total_movies,
      ROUND(COALESCE(AVG(CASE WHEN m.budget > 0 THEN (m.revenue - m.budget) END), 0), 2) AS avg_profit,
      ROUND(COALESCE(AVG(CASE WHEN m.budget > 0 THEN ((m.revenue - m.budget)::numeric / m.budget * 100) END), 0), 2) AS avg_roi,
      COALESCE((
        SELECT g.name
        FROM movies s
        CROSS JOIN UNNEST(s.genre_ids) AS gid
        JOIN genres g ON g.id = gid
        WHERE s.budget > 0 ${subGenreQuery} ${subYearQuery}
        GROUP BY g.name
        ORDER BY SUM(s.revenue) DESC
        LIMIT 1
      ), 'Hành Động') AS top_genre,
      COALESCE((
        SELECT jsonb_agg(y.yr)
        FROM (
          SELECT DISTINCT EXTRACT(YEAR FROM s.release_date)::int AS yr
          FROM movies s
          WHERE s.release_date IS NOT NULL AND s.budget > 0
          ORDER BY yr DESC
        ) y
      ), '[]'::jsonb) AS available_years,
      COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
          'id', sub.id,
          'title', sub.title,
          'poster_path', sub.poster_path,
          'revenue', sub.revenue,
          'budget', sub.budget,
          'release_date', sub.release_date
        ))
        FROM (
          SELECT s.id, s.title, s.poster_path, s.revenue, s.budget, s.release_date
          FROM movies s
          WHERE s.budget > 0 ${subGenreQuery} ${subYearQuery}
          ORDER BY s.revenue DESC
          LIMIT 5
        ) sub
      ), '[]'::jsonb) AS top_5_movies,
      COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
          'id', pk.id,
          'title', pk.title,
          'poster_path', pk.poster_path,
          'budget', pk.budget,
          'revenue', pk.revenue,
          'release_date', pk.release_date,
          'net_profit', (pk.revenue - pk.budget),
          'roi', ROUND(((pk.revenue - pk.budget)::numeric / pk.budget * 100), 2)
        ))
        FROM (
          SELECT s.id, s.title, s.poster_path, s.budget, s.revenue, s.release_date
          FROM movies s
          WHERE s.budget > 0 AND s.revenue > s.budget ${subGenreQuery} ${subYearQuery}
          ORDER BY (s.revenue - s.budget) DESC
          LIMIT 2
        ) pk
      ), '[]'::jsonb) AS profit_kings,
      COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
          'id', flop.id,
          'title', flop.title,
          'poster_path', flop.poster_path,
          'budget', flop.budget,
          'revenue', flop.revenue,
          'release_date', flop.release_date,
          'loss_amount', (flop.budget - flop.revenue),
          'roi', ROUND(((flop.revenue - flop.budget)::numeric / flop.budget * 100), 2)
        ))
        FROM (
          SELECT s.id, s.title, s.poster_path, s.budget, s.revenue, s.release_date
          FROM movies s
          WHERE s.budget > 0 AND s.revenue > 0 AND s.revenue < s.budget ${subGenreQuery} ${subYearQuery}
          ORDER BY (s.budget - s.revenue) DESC
          LIMIT 2
        ) flop
      ), '[]'::jsonb) AS box_office_flops
    FROM movies m
    WHERE m.budget > 0 ${genreQuery} ${yearQuery};
  `;
  const result = await pool.query(sql);
  return result.rows[0];
};

module.exports = {
  findTopRevenueMovies,
  findRevenueStats,
};
