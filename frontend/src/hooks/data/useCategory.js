import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../service/category.js";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
  });
};
