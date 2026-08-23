import {
  fetchUploadAvatar,
  fetchUpdateUsername,
  fetchUpdatePassword,
} from "../api/user.js";
import { handleFetch } from "../utils/serviceUtils.js";

// 1. Upload Avatar Service
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return handleFetch(() => fetchUploadAvatar(formData));
};

// 2. Update Username Service
export const updateUsername = async (username) => {
  return handleFetch(() => fetchUpdateUsername(username));
};

// 3. Update Password Service
export const updatePassword = async (newPassword) => {
  return handleFetch(() => fetchUpdatePassword(newPassword));
};