import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigat = useNavigate();

    const updateUserFromToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            let nom = decodedToken.nom || "";
            let prenom = decodedToken.prenom || "";
            let role = decodedToken.role || "";
            setUser({
                nom: nom,
                prenom: prenom,
                role: role
            });
        } catch (err) {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            updateUserFromToken(token);
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        updateUserFromToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigat('/login');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};