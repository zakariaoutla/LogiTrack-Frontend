import axiosInstance from "./axiosInstance.js";

export const getTotalImpaye = (id)=>{
    return axiosInstance.get(`/orders/total-impaye/${id}`)
}

export const getAllOrders = (id, page, size, orderBy, order)=>{
    return axiosInstance.get(`/orders/commande/${id}?page=${page}&size=${size}&sort=${orderBy},${order.toLowerCase()}`)
}

export const ajouteUnProduit =  (orderId,data) => {
    return  axiosInstance.post(`/${orderId}/products`, data);
};

export const deleteLigne =  (id) => {
    return  axiosInstance.delete(`/orders/${id}`);
};