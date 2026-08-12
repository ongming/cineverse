// utils/movieRelationUtils.js
// Decoupled relation utility module for performing joins across relational mock tables

import { movies } from "../data/movies.js";
import { actors } from "../data/actors.js";
import { movie_cast } from "../data/movieCast.js";
import { movie_images } from "../data/movieImages.js";
import { trailers } from "../data/trailers.js";
import { genres, movie_genres } from "../data/genres.js";

/**
 * Join movie_cast table with actors table for a given movie ID
 * Returns full actor objects with character_name and cast_order attached
 */
export const getMovieCast = (movieId) => {
  const numericMovieId = Number(movieId);
  const castLinks = movie_cast.filter((mc) => mc.movie_id === numericMovieId);

  if (castLinks.length === 0) {
    // Fallback if no specific relation link
    return actors.map((a, i) => ({
      ...a,
      character_name: "Diễn viên chính",
      cast_order: i + 1,
    }));
  }

  return castLinks
    .map((mc) => {
      const actorObj = actors.find((a) => a.id === mc.actor_id);
      if (!actorObj) return null;
      return {
        ...actorObj,
        character_name: mc.character_name,
        cast_order: mc.cast_order,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.cast_order - b.cast_order);
};

/**
 * Join movie_cast table with movies table for a given actor ID
 * Returns all movies starring the actor, along with their specific character_name
 */
export const getActorFilmography = (actorId) => {
  const numericActorId = Number(actorId);
  const castLinks = movie_cast.filter((mc) => mc.actor_id === numericActorId);

  if (castLinks.length === 0) {
    // Fallback to general movies showcase if no specific mapping
    return movies.slice(0, 4).map((m) => ({
      ...m,
      character_name: "Vai diễn chính",
    }));
  }

  return castLinks
    .map((mc) => {
      const movieObj = movies.find((m) => m.id === mc.movie_id);
      if (!movieObj) return null;
      return {
        ...movieObj,
        character_name: mc.character_name,
      };
    })
    .filter(Boolean);
};

/**
 * Get movie images (backdrops / posters) filtered by type and sorted by display_order
 */
export const getMovieImages = (movieId, type = "backdrop") => {
  const numericId = Number(movieId);
  const imgs = movie_images.filter(
    (img) => img.movie_id === numericId && img.type === type
  );

  if (imgs.length === 0) {
    return movie_images.filter((img) => img.type === type);
  }
  return [...imgs].sort((a, b) => a.display_order - b.display_order);
};

/**
 * Get trailers and teasers for a movie
 */
export const getMovieTrailers = (movieId) => {
  const numericId = Number(movieId);
  return trailers.filter((t) => t.movie_id === numericId);
};

/**
 * Get genre names for a movie by joining movie_genres with genres table
 */
export const getMovieGenres = (movieId) => {
  const numericId = Number(movieId);
  const links = movie_genres.filter((mg) => mg.movie_id === numericId);
  if (links.length === 0) {
    const movieObj = movies.find((m) => m.id === numericId);
    return movieObj?.genre || ["Hành Động", "Phiêu Lưu"];
  }
  return links
    .map((mg) => genres.find((g) => g.id === mg.genre_id)?.name)
    .filter(Boolean);
};

/**
 * Get related movies by matching genres
 */
export const getRelatedMovies = (movieId, limit = 4) => {
  const numericId = Number(movieId);
  const target = movies.find((m) => m.id === numericId);
  if (!target) return movies.slice(0, limit);
  const targetGenres = target.genre || [];
  const related = movies.filter(
    (m) => m.id !== numericId && m.genre?.some((g) => targetGenres.includes(g))
  );
  if (related.length === 0) return movies.filter((m) => m.id !== numericId).slice(0, limit);
  return related.slice(0, limit);
};
