import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/user.service";

const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async (token) => {
        try {
            const response = await getUser(token)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchUser(token)
        }
        else {
            setLoading(false)
        }
    }, [token])

    return (
        <UserContext.Provider value={token, setToken, setUser, user, loading} >
            {children}
        </UserContext.Provider>
    )
}


export const useUser = () => useContext(UserContext)