import { fetchLogin, fetchRegister, fetchCurrentUser } from "../api/auth.js";
import { handleFetch } from "../utils/serviceUtils.js";

export const loginUser = async (data) => {
  return handleFetch(() => fetchLogin(data));
};

export const registerUser = async (data) => {
  return handleFetch(() => fetchRegister(data));
};

export const getCurrentUser = async () => {
  return handleFetch(() => fetchCurrentUser());
};
