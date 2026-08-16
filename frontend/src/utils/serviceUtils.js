/**
 * Base utility for handling API service requests with centralized error handling.
 * @param {Function} fetchFunction - Async function returning an Axios Promise
 * @returns {Promise<any>} Response payload data
 */
export const handleFetch = async (fetchFunction) => {
  try {
    const res = await fetchFunction();

    if (!res.data || !res.data.success) {
      throw new Error(res.data?.message || "Operation failed");
    }
    return res.data.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Server error (${error.response.status}):`,
        error.response.data?.message,
      );
      throw new Error(
        error.response.data?.message || `Server Error (${error.response.status})`,
      );
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
