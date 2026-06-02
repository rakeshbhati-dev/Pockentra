import axios from "axios"

const api=import.meta.env.VITE_USER_API

export const getUser=async (token)=>{
    const response=await axios.get(`${api}/`,{headers:{Authorization:`Bearer ${token}`}})
    return response.data;
}

export const updateProfile=async(token,data)=>{
    const response=await axios.put(`${api}/`,data,{headers:{Authorization:`Bearer ${token}`}})
    return response.data;
}