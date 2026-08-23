import axios from "axios";

// 1. Upload Avatar API Call
export const fetchUploadAvatar = async (formData) => {
  return axios.post("/api/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 2. Update Username API Call
export const fetchUpdateUsername = async (username) => {
  return axios.put("/api/users/username", { username });
};

// 3. Update Password API Call
export const fetchUpdatePassword = async (newPassword) => {
  return axios.put("/api/users/password", { newPassword });
};