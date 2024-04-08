import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import exp from 'constants';


type User = {
    username: string;
    id: string;
    role: string;
};

export type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (userData: User & { token: string }) => void;
    logout: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: { username: string, id: string, token: string, role: string }) => {
        setUser({ username: userData.username, id: userData.id, role: userData.role });
        setToken( userData.token); 
        const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 1);
        setCookie('username', userData.username, { expires: expirationDate });
        setCookie('userId', userData.id, { expires: expirationDate });
        setCookie('token', userData.token, { expires: expirationDate });
        setCookie('role', userData.role, { expires: expirationDate });
    };
    

    useEffect(() => {
        const storedToken = getCookie('token') || ''; 
        const storedUserName =  getCookie('username') || '';
        const storedUserId =  getCookie('userId') || '';
        const storedUserRole =  getCookie('role') || '';
        if (storedToken) {
            setToken(storedToken);
            setUser({ username: storedUserName, id: storedUserId || '', role: storedUserRole});
        }
    }, []);
      

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);



    
    


    const logout = () => {
        console.log("Logging out");
        setUser(null);
        deleteCookie('token'); 
        deleteCookie('userId');
        deleteCookie('username');
        deleteCookie('role');
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext) as AuthContextType;

export default AuthContext;

