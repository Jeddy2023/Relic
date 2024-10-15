import React, { useState, createContext, useEffect, ReactNode } from "react";
import Cookies from 'js-cookie';
import { User } from "../utils/types";

interface LoginData {
    accessToken: string;
    user: User;
    expiresIn: number;
}

interface UserContextType {
    accessToken: string | null;
    user: User | null;
    login: (data: LoginData) => void;
    logout: () => void;
    loading: boolean;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
    accessToken: null,
    user: null,
    login: () => { },
    logout: () => { },
    loading: true,
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const accessTokenFromCookie = Cookies.get('accessToken');
        const userDataFromCookie = Cookies.get('userData');
        if (accessTokenFromCookie && userDataFromCookie) {
            setAccessToken(accessTokenFromCookie);
            setUser(JSON.parse(userDataFromCookie) as User);
        }
        setLoading(false);
    }, []);

    const login = (data: LoginData) => {
        const { accessToken, user, expiresIn } = data;
        setAccessToken(accessToken);
        setUser(user);
        const expirationDate = new Date(new Date().getTime() + expiresIn);

        Cookies.set('accessToken', accessToken, {
            expires: expirationDate,
            secure: true,
            sameSite: 'Strict'
        });

        Cookies.set('userData', JSON.stringify(user), {
            expires: expirationDate,
            secure: true,
            sameSite: 'Strict'
        });
    };

    const logout = () => {
        setAccessToken(null);
        Cookies.remove('accessToken');
        Cookies.remove('userData');
    };

    return (
        <UserContext.Provider value={{ accessToken, user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;