import axiosInstance from "./axiosInstance.js";

export const getTotalClient = ()=>{
    return  axiosInstance.get("/clients/total-clients")
}