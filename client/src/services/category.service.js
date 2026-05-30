import axios from "axios";

const api= import.meta.env.VITE_CATEGORY_API

export const getAllCategories=async (token) => {
    const response=await axios.get(`${api}/`,{headers:{Authorization:`Bearer ${token}`}})
    return response.data;
}