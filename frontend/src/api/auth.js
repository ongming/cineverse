import axios from "axios";

export const fetchLogin = async (data) => {
  return axios.post("/api/auth/login", data);
};

export const fetchRegister = async (data) => {
  return axios.post("/api/auth/register", data);
};

export const fetchCurrentUser = async () => {
  return axios.get("/api/auth/me");
};

export const fetchSendOTP = async (data) => {
  return axios.post("/api/auth/send-otp", data);
};

export const fetchResetPassword = async (data) => {
  return axios.post("/api/auth/reset-password", data);
};

export const fetchGoogleLogin = async (credential) => {
  return axios.post("/api/auth/google", { credential });
};
