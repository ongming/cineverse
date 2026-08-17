const actorModel = require("./actors.model.js");
const NotFoundError = require("../../errors/NotFoundError.js");

const IMAGE_BASE_W500 = "https://image.tmdb.org/t/p/w500";

const formatUrl = (path, baseUrl) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};

const getTopActors = async (limit = 20) => {
  const actors = await actorModel.findTopActors(limit);

  if (!actors || actors.length === 0) {
    throw new NotFoundError("No top actors found");
  }

  return actors.map((actor) => ({
    ...actor,
    profile_path: formatUrl(actor.profile_path, IMAGE_BASE_W500),
  }));
};

const getActorById = async (id) => {
  const actor = await actorModel.findActorById(id);

  if (!actor) {
    throw new NotFoundError(`Actor with ID ${id} not found`);
  }

  return {
    ...actor,
    profile_path: formatUrl(actor.profile_path, IMAGE_BASE_W500),
    images: actor.images.map((image) => formatUrl(image, IMAGE_BASE_W500)),
    movies: actor.movies.map((movie) => ({
      ...movie,
      poster_path: formatUrl(movie.poster_path, IMAGE_BASE_W500),
    })),
  };
};

const getActorTrailerById = async (trailerId) => {
  const actor = await actorModel.findActorTrailerById(trailerId);

  if (!actor) {
    throw new NotFoundError(`Actor for trailer ID ${trailerId} not found`);
  }

  return {
    ...actor,
    profile_path: formatUrl(actor.profile_path, IMAGE_BASE_W500),
  };
};

module.exports = {
  getTopActors,
  getActorById,
  getActorTrailerById,
};
