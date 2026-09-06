import axios from "axios";
import { toast } from "react-toastify";

let currentAccessToken = null;
let updateAccessTokenCallback = null;

export const setUpdateAccessTokenHandler = (fn) => {
  updateAccessTokenCallback = (newToken) => {
    currentAccessToken = newToken;
    if (fn) fn(newToken);
  };
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Skip retry on auth endpoints to prevent infinite loops
    if (
      originalRequest?.url?.includes("/api/auth/login") ||
      originalRequest?.url?.includes("/api/auth/google") ||
      originalRequest?.url?.includes("/api/auth/register") ||
      originalRequest?.url?.includes("/api/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    const currentRetryCount = originalRequest._retryCount || 0;

    if (error.response?.status === 401 && currentRetryCount < 4) {
      originalRequest._retryCount = currentRetryCount + 1;

      try {
        const res = await axiosClient.post("/api/auth/refresh");
        const newToken = res.data?.data?.token || res.data?.token;

        if (newToken) {
          currentAccessToken = newToken;
          if (updateAccessTokenCallback) {
            updateAccessTokenCallback(newToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshErr) {
        currentAccessToken = null;
        if (updateAccessTokenCallback) {
          updateAccessTokenCallback(null);
        } 
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;