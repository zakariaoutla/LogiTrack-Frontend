import axiosInstance from "./axiosInstance.js";


export const getAllProduit=(page, size, orderBy, order)=>{
    return axiosInstance.get(`/produit?page=${page}&size=${size}&sort=${orderBy},${order}`)
}

export const postProduit =(data)=>{
    return axiosInstance.post("/produit",data)
}

export const getProduit = (id)=>{
    return axiosInstance.get(`/produit/${id}`)
}

export const putProduit =(id,data)=>{
    return axiosInstance.put(`/produit/${id}`, data)
}

export const deleteProduit=(id)=>{
    return axiosInstance.delete(`/produit/${id}`)
}

export const getTotalProduit = ()=>{
    return axiosInstance.get("/produit/total-produit")
}
