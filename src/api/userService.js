import axiosInstance from "./axiosInstance.js";

export const postUserRegister = (firstName, lastName,email, password, role)=>{
   return  axiosInstance.post("/auth/register",
        {
            nom:firstName,
            prenom:lastName,
            email :email,
            password: password,
            RoleUser: role})
}

export const postUserLogin = (email, password)=>{
   return  axiosInstance.post("/auth/login",
       {
           email : email,
           password: password
       })
}