import axiosClient from "./axiosClient";

export function fetchTopActors() {
  return axiosClient.get("/api/actors/top");
}

export function fetchActorById(id) {
  return axiosClient.get(`/api/actors/${id}`);
}

export function fetchActorTrailerById(trailerId) {
  return axiosClient.get(`/api/actors/trailer/${trailerId}`);
}