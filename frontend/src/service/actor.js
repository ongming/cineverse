import {
  fetchTopActors,
  fetchActorById,
  fetchActorTrailerById,
} from "../api/actor.js";
import { handleFetch } from "../utils/serviceUtils.js";

export const getTopActors = async () => {
  return handleFetch(() => fetchTopActors());
};

export const getActorById = async (id) => {
  return handleFetch(() => fetchActorById(id));
};

export const getActorTrailerById = async (trailerId) => {
  return handleFetch(() => fetchActorTrailerById(trailerId));
};
