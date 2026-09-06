import axiosClient from "./axiosClient.js";

export const fetchLogin = async (data) => {
  return axiosClient.post("/api/auth/login", data);
};

export const fetchRegister = async (data) => {
  return axiosClient.post("/api/auth/register", data);
};

export const fetchCurrentUser = async () => {
  return axiosClient.get("/api/auth/me");
};

export const fetchSendOTP = async (data) => {
  return axiosClient.post("/api/auth/send-otp", data);
};

export const fetchResetPassword = async (data) => {
  return axiosClient.post("/api/auth/reset-password", data);
};

export const fetchGoogleLogin = async (credential) => {
  return axiosClient.post("/api/auth/google", { credential });
};

export const fetchRefreshToken = async () => {
  return axiosClient.post("/api/auth/refresh");
};

export const fetchLogout = async () => {
  return axiosClient.post("/api/auth/logout");
};