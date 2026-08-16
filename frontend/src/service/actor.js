import { fetchTopActors, fetchActorById } from "../api/actor.js";
import { handleFetch } from "../utils/serviceUtils.js";

export const getTopActors = async () => {
  return handleFetch(() => fetchTopActors());
};

export const getActorById = async (id) => {
  return handleFetch(() => fetchActorById(id));
};
