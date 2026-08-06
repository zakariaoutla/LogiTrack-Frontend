import axiosInstance from "./axiosInstance.js";

export const getTotalProduit = ()=>{
    return axiosInstance.get("/produit/total-produit")
}