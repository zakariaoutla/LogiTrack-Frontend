import axiosInstance from "./axiosInstance.js";

export const getTotalOrder = ()=>{
    return axiosInstance.get("/commande/total-commande")
}