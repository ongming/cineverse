import axios from "axios";

export const fetchCategories = async () => {
    return axios.get("/api/genres")
}