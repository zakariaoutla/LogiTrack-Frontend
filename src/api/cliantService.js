import axiosInstance from "./axiosInstance.js";


export const getAllClients = (page, size, orderBy, order)=>{
    return axiosInstance.get(`/clients?page=${page}&size=${size}&sort=${orderBy},${order.toLowerCase()}`)
}

export const getTotalClient = ()=>{
    return  axiosInstance.get("/clients/total-clients")
}