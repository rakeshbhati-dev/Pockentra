import axios from "axios";

const api = import.meta.env.VITE_TRANSACTION_API;

export const getAllTransaction = async (token, queryString = "") => {
    const response = await axios.get(
        `${api}?${queryString}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const addTransaction=async (token,data) => {
    const response=await axios.post(`${api}/`,data,{headers:{Authorization:`Bearer ${token}`}})
    return response.data;
}

export const getTransactionById=async (token,id) => {
    const response=await axios.get(`${api}/${id}`,{ headers: { Authorization: `Bearer ${token}` } });
    return response.data
}
export const updateTransaction=async (token,id,data) => {
    const response=await axios.put(`${api}/${id}`,data,{ headers: { Authorization: `Bearer ${token}` } });
    return response.data
}
 