import axios from "axios";

export function fetchTopRevenueMovies(params) {
  return axios.get("/api/revenue", {
    params: params,
  });
}

export function fetchRevenueStats(params) {
  return axios.get("/api/revenue/stats", {
    params: params,
  });
}
