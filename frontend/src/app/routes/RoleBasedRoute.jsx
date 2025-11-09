import { useAuth } from "../providers/AuthContext"
import { Navigate } from "react-router-dom";
export const RoleBasedRoute = ({children, role}) => {
    const { user, loading } = useAuth();

    if(loading){
        return <p>Loading...</p>
    }

    if(!user)
        return <Navigate to="/login" />
    
    if(user.role !== role){
        return <Navigate to="/unauthorized" />
    }

    return children;
}