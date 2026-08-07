import axiosInstance from "./axiosInstance.js";


export const getAllClients = (page, size, sort)=>{
    return axiosInstance.get("/clients",{
        params:{
            page: page,
            size: size,
            sort:sort
        }
    })
}

export const getTotalClient = ()=>{
    return  axiosInstance.get("/clients/total-clients")
}