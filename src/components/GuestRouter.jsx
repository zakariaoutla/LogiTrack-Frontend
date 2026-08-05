import {Navigate, Outlet} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function GuestRouter(){
    const token = localStorage.getItem("token")

    if (token){
       try {
           const decodedToken = jwtDecode(token)
           const role = decodedToken.role || "";

           if(role === "ROLE_ADMIN" || role ==="ROLE_AGENT"){
               return <Navigate to="/dashboard" replace />
           }
           return <Navigate to="/" replace />
       }catch (err){
           localStorage.removeItem("token")
           return <Outlet/>
       }
    }
    return <Outlet/>
}