import axios from "axios"

const api=import.meta.env.VITE_AUTH_API

export const register=async (formData) => {
    const response=await axios.post(`${api}/register`,formData);
    return response.data
}

export const login=async(formData)=>{
    const response=await axios.post(`${api}/login`,formData);
    return response.data
}