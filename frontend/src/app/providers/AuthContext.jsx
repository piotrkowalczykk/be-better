import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if(savedToken){
            const decoded = jwtDecode(savedToken);
            console.log(decoded);
            setToken(savedToken);
            setUser({
                email: decoded.sub,
                roles: decoded.roles.includes(",") 
                ? decoded.roles.split(",") 
                : [decoded.roles]
            });
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        setToken(token);
        setUser({
                email: decoded.sub,
                roles: decoded.roles.includes(",") 
                ? decoded.roles.split(",") 
                : [decoded.roles]
        });
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, token, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    ); 
}

export const useAuth = () => useContext(AuthContext);