import axios from "axios";

const api=import.meta.env.VITE_DASHBOARD_API

export const getStats=async (token) => {
     const response=await axios.get(`${api}/`,{headers:{Authorization:`Bearer ${token}`}})
    return response.data;
}

export const getExpenseStats=async (token) => {
    const response=await axios.get(`${api}/expense-breakdown`,{headers:{Authorization:`Bearer ${token}`}})
    return response.data;
}

