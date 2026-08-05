import {createContext, useEffect, useState} from "react";
import axiosInstance from "../api/axiosInstance.js";
import {useNavigate} from "react-router-dom";

export const  AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigat = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token){
            axiosInstance.get('/auth/me')
                .then((res)=>{
                    setUser(res.data)
                    console.log("ha data", res.data)
                })
                .catch((error)=>{
                    console.error('token invalid ou expire')
                    localStorage.removeItem('token')
                    setUser(null)
                })
                .finally(()=>{
                    setLoading(false)
                })
        }else {
            setLoading(false)
        }
    },[])

    const logout =()=>{
        localStorage.removeItem('token')
        setUser(null)
        navigat('/login')
    }

    return(
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )

}