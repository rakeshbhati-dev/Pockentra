import axios from "axios";

const api = import.meta.env.VITE_TRANSACTION_API;

export const getAllTransaction = async (token, queryString = "") => {
    const response = await axios.get(
        `${api}?${queryString}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};