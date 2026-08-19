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