import axiosInstance from "./axiosInstance.js";

export const getTotalOrder = ()=>{
    return axiosInstance.get("/commande/total-commande")
}

export const getTotalCommandeClient = (id)=>{
    return axiosInstance.get(`/commande/total-commande-client/${id}`)
}

export const getAllCommandes =  (page, size, orderBy, order) => {
    return  axiosInstance.get(`/commande?page=${page}&size=${size}&sort=${orderBy},${order}`);
};

export const getCommandeById =  (id) => {
    return  axiosInstance.get(`/commande/${id}`);
};

export const creeCommande =  (data) => {
    return  axiosInstance.post("/commande", data);
};

export const updateStatut =  (id, newStatut) => {
    return  axiosInstance.put(`/commande/${id}/statut`, null, {
        params: { newStatut }
    });
};

