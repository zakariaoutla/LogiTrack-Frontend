import {Navigate, Outlet} from "react-router-dom";
import Login from "../pages/Login.jsx";

const ProtectedRoute = ()=>{
    const token = localStorage.getItem("token")

    return token? <Outlet/> : <Navigate to="/login" replace/>
}
export default ProtectedRoute