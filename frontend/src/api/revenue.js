import axiosClient from "./axiosClient";

export function fetchTopRevenueMovies(params) {
  return axiosClient.get("/api/revenue", {
    params: params,
  });
}

export function fetchRevenueStats(params) {
  return axiosClient.get("/api/revenue/stats", {
    params: params,
  });
}
