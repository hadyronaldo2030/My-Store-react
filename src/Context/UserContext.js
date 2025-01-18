import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../API/axios";
import { USER } from "../API/Api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Axios.get(`/${USER}`);
                setUser(response.data);
            } catch (error) {
                setError(error);
                navigate("/login", { replace: true });
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
