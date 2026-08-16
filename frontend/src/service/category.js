import { fetchCategories } from "../api/category";
import { handleFetch } from "../utils/serviceUtils.js";

export const getCategories = async () => {
  return handleFetch(fetchCategories);
};
