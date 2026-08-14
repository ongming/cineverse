require("dotenv").config();

const pool = require("./src/config/database.js");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

if (!TMDB_API_KEY) {
  throw new Error("Missing TMDB_API_KEY in .env");
}

async function tmdbFetch(path) {
  const separator = path.includes("?") ? "&" : "?";

  const response = await fetch(
    `${TMDB_BASE_URL}${path}${separator}api_key=${TMDB_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(
      `TMDb API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function getMovieData() {
  const pages = [1, 2, 3];

  const requests = pages.flatMap((page) => [
    tmdbFetch(`/movie/now_playing?language=vi-VN&region=VN&page=${page}`),
    tmdbFetch(`/movie/upcoming?language=vi-VN&region=VN&page=${page}`),
    tmdbFetch(`/movie/popular?language=vi-VN&region=VN&page=${page}`),
    tmdbFetch(`/trending/movie/week?language=vi-VN&page=${page}`),
  ]);

  const results = await Promise.all(requests);

  const trendingList = results
    .filter((_, idx) => idx % 4 === 3)
    .flatMap((res) => res.results || []);

  const ids = results.flatMap((res) => (res.results || []).map((movie) => movie.id));

  return {
    movieIds: [...new Set(ids)],
    trendingList,
  };
}

async function syncMovie(client, movieId) {
  const movie = await tmdbFetch(
    `/movie/${movieId}?language=vi-VN&append_to_response=videos,credits,release_dates`
  );

  const images = await tmdbFetch(`/movie/${movieId}/images`);

  // Get Vietnamese age rating
  const vnRelease = movie.release_dates?.results?.find(
    (country) => country.iso_3166_1 === "VN"
  );

  const ageRating =
    vnRelease?.release_dates?.find((release) => release.certification)
      ?.certification || null;

  // Get director
  const director = (movie.credits?.crew || []).find(
    (person) => person.job === "Director"
  );

  const genreIds = (movie.genres || []).map((g) => g.id);

  const releaseDate = movie.release_date
    ? movie.release_date.split("T")[0]
    : null;

  // =========================
  // MOVIE
  // =========================

  await client.query(
    `
        INSERT INTO movies (
            id,
            title,
            overview,
            release_date,
            runtime,
            vote_average,
            vote_count,
            poster_path,
            budget,
            revenue,
            country,
            age_rating,
            release_status,
            director_name,
            imdb_id,
            popularity,
            genre_ids
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,
            $9,$10,$11,$12,$13,$14,$15,$16,$17
        )
        ON CONFLICT (id)
        DO UPDATE SET
            title = EXCLUDED.title,
            overview = EXCLUDED.overview,
            release_date = EXCLUDED.release_date,
            runtime = EXCLUDED.runtime,
            vote_average = EXCLUDED.vote_average,
            vote_count = EXCLUDED.vote_count,
            poster_path = EXCLUDED.poster_path,
            budget = EXCLUDED.budget,
            revenue = EXCLUDED.revenue,
            country = EXCLUDED.country,
            age_rating = EXCLUDED.age_rating,
            release_status = EXCLUDED.release_status,
            director_name = EXCLUDED.director_name,
            imdb_id = EXCLUDED.imdb_id,
            popularity = EXCLUDED.popularity,
            genre_ids = EXCLUDED.genre_ids
        `,
    [
      movie.id,
      movie.title,
      movie.overview || null,
      releaseDate,
      movie.runtime || null,
      movie.vote_average || 0,
      movie.vote_count || 0,
      movie.poster_path || null,
      movie.budget || 0,
      movie.revenue || 0,
      movie.production_countries?.[0]?.name || null,
      ageRating,
      movie.status || null,
      director?.name || null,
      movie.imdb_id || null,
      movie.popularity || 0,
      genreIds,
    ],
  );

  // =========================
  // GENRES
  // =========================

  for (const genre of movie.genres || []) {
    await client.query(
      `
            INSERT INTO genres (id, name)
            VALUES ($1, $2)
            ON CONFLICT (id)
            DO UPDATE SET name = EXCLUDED.name
            `,
      [genre.id, genre.name]
    );

    await client.query(
      `
            INSERT INTO movie_genres (movie_id, genre_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
            `,
      [movie.id, genre.id]
    );
  }

  // =========================
  // TRAILERS
  // =========================

  await client.query("DELETE FROM trailers WHERE movie_id = $1", [movie.id]);

  let videoResults = movie.videos?.results || [];

  // Fallback: If no Vietnamese videos found, fetch English trailers from TMDb
  if (videoResults.length === 0) {
    try {
      const enVideos = await tmdbFetch(`/movie/${movieId}/videos?language=en-US`);
      videoResults = enVideos.results || [];
    } catch (err) {
      console.warn(`Failed to fetch fallback en-US videos for movie ${movieId}:`, err.message);
    }
  }

  const trailers = videoResults.filter(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer")
  );

  for (const trailer of trailers.slice(0, 5)) {
    await client.query(
      `
            INSERT INTO trailers (
                movie_id,
                youtube_key,
                name,
                type,
                published_at
            )
            VALUES ($1,$2,$3,$4,$5)
            `,
      [
        movie.id,
        trailer.key,
        trailer.name || null,
        trailer.type || null,
        trailer.published_at || null,
      ]
    );
  }

  // =========================
  // MOVIE IMAGES
  // =========================

  await client.query("DELETE FROM movie_images WHERE movie_id = $1", [
    movie.id,
  ]);

  const mainPoster = movie.poster_path;

  const imagesMovie = [
    ...(images?.backdrops || []).map((image) => ({
      ...image,
      type: "backdrop",
    })),
    ...(images?.posters || []).map((image) => ({
      ...image,
      type: "poster",
    })),
  ]
    .filter((image) => image.file_path !== mainPoster)
    .slice(0, 20);

  for (const [index, image] of imagesMovie.entries()) {
    await client.query(
      `
            INSERT INTO movie_images (
                movie_id,
                file_path,
                type,
                width,
                height,
                vote_average,
                display_order
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            `,
      [
        movie.id,
        image.file_path,
        image.type,
        image.width || null,
        image.height || null,
        image.vote_average || 0,
        index,
      ]
    );
  }

  if (!mainPoster && imagesMovie.length > 0) {
    await client.query(
      `
      UPDATE movies
      SET poster_path = $1
      WHERE id = $2
      `,
      [imagesMovie[0]?.file_path || null, movie.id]
    );
  }

  // =========================
  // ACTORS
  // =========================

  const cast = (movie.credits?.cast || []).slice(0, 20);

  for (const actor of cast) {
    await client.query(
      `
            INSERT INTO actors (
                id,
                name,
                profile_path,
                popularity
            )
            VALUES ($1,$2,$3,$4)
            ON CONFLICT (id)
            DO UPDATE SET
                name = EXCLUDED.name,
                profile_path = EXCLUDED.profile_path,
                popularity = EXCLUDED.popularity
            `,
      [actor.id, actor.name, actor.profile_path || null, actor.popularity || 0]
    );

    await client.query(
      `
            INSERT INTO movie_cast (
                movie_id,
                actor_id,
                character_name,
                cast_order
            )
            VALUES ($1,$2,$3,$4)
            ON CONFLICT (movie_id, actor_id)
            DO UPDATE SET
                character_name = EXCLUDED.character_name,
                cast_order = EXCLUDED.cast_order
            `,
      [movie.id, actor.id, actor.character || null, actor.order || 0]
    );
  }

  console.log(`Synced: ${movie.title} (${movie.id})`);
}

async function main() {
  const client = await pool.connect();

  try {
    console.log("=== Cineverse local TMDb sync started ===");

    const { movieIds, trendingList } = await getMovieData();

    console.log(`Found ${movieIds.length} unique movies.`);

    await client.query("BEGIN");

    for (const movieId of movieIds) {
      await syncMovie(client, movieId);
    }

    // =========================
    // TRENDING WEEKLY MOVIES
    // =========================

    await client.query("DELETE FROM trending_weekly");

    for (const [index, movie] of trendingList.slice(0, 20).entries()) {
      await client.query(
        `
        INSERT INTO trending_weekly (movie_id, trending_rank)
        VALUES ($1, $2)
        ON CONFLICT (movie_id) DO UPDATE SET trending_rank = EXCLUDED.trending_rank
        `,
        [movie.id, index + 1]
      );
    }

    console.log(`Synced ${Math.min(20, trendingList.length)} weekly trending ranks.`);

    await client.query("COMMIT");

    console.log("=== Sync completed successfully ===");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Sync failed:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
