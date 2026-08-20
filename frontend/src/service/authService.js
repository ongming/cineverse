import {
  fetchLogin,
  fetchRegister,
  fetchCurrentUser,
  fetchSendOTP,
  fetchResetPassword,
  fetchGoogleLogin,
} from "../api/auth.js";
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

export const sendOTPEmailService = async (email) => {
  return handleFetch(() => fetchSendOTP({ email }));
};

export const resetPasswordService = async (data) => {
  return handleFetch(() => fetchResetPassword(data));
};

export const googleLoginService = async (credential) => {
  return handleFetch(() => fetchGoogleLogin(credential));
};
