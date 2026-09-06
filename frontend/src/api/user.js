import axiosClient from "./axiosClient";

// 1. Upload Avatar API Call
export const fetchUploadAvatar = async (formData) => {
  return axiosClient.post("/api/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 2. Update Username API Call
export const fetchUpdateUsername = async (username) => {
  return axiosClient.put("/api/users/username", { username });
};

// 3. Update Password API Call
export const fetchUpdatePassword = async (newPassword) => {
  return axiosClient.put("/api/users/password", { newPassword });
};