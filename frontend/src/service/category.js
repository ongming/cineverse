import { fetchCategories } from "../api/category";

export const getCategories = async () => {
  try {
    const res = await fetchCategories();
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res.data.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Server error (${error.response.status}):`,
        error.response.data?.message,
      );
      throw new Error(error.response.data?.message);
    } else if (error.request) {
      console.error("No response from server:", error.message);
      throw new Error(
        "Cannot connect to server. Check your internet connection.",
      );
    } else {
      console.error("Request setup error:", error.message);
      throw error;
    }
  }
};
