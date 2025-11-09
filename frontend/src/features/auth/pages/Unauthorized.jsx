import { useAuth } from "../../../app/providers/AuthContext";

export const Unauthorized = () => {

    const { user } = useAuth(); 
    return (
        <p>401</p>
        
    );
}