import { createContext, useContext, useEffect, useState } from "react";
import ApiService from '@/app/Infraestructure/axios'
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState();

    const saveToken = (token) => {
        setToken(token);
        sessionStorage.setItem("token", token);
    }

    const getToken = () => {
        const token = sessionStorage.getItem("token");
        ApiService.setToken(token)
        setToken(token);

    }

    useEffect(() => {
        getToken()
    }, [])

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext)
