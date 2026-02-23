import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);


        if (data.user.role === "patient") {
            navigate("/");
        } else if (data.user.role === "doctor") {
            navigate("/");
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setToken(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);