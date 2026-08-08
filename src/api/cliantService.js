import axiosInstance from "./axiosInstance.js";


export const getAllClients = (page, size, orderBy, order)=>{
    return axiosInstance.get(`/clients?page=${page}&size=${size}&sort=${orderBy},${order.toLowerCase()}`)
}

export const postClient =(data)=>{
    return axiosInstance.post("/clients",data)
}

export const getClient = (id)=>{
    return axiosInstance.get(`/clients/${id}`)
}

export const putClient =(id,data)=>{
    return axiosInstance.put(`/clients/${id}`, data)
}

export const getTotalClient = ()=>{
    return  axiosInstance.get("/clients/total-clients")
}