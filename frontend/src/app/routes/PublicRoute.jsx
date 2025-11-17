import { useAuth } from "../providers/AuthContext"
import { Navigate } from "react-router-dom";
export const PublicRoute = ({children}) => {
    const { user, loading } = useAuth();

    if(loading){
        return <p>Loading...</p>
    }

    if(user)
        return <Navigate to="/dashboard" />
    
    return children;
}