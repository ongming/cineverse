import axios from "axios";

export function fetchTopActors() {
  return axios.get("/api/actors/top");
}

export function fetchActorById(id) {
  return axios.get(`/api/actors/${id}`);
}

export function fetchActorTrailerById(trailerId) {
  return axios.get(`/api/actors/trailer/${trailerId}`);
}