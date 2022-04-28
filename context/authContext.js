import axios from "axios";
import Router from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const authContext = createContext({
    isLoggedIn: false,
    authLoading: true,
    fullName: null,
    authToken: null,
    email: null,
    login: () => {},
    logout: () => {},
});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({
        isLoggedIn: false,
        authLoading: true,
        fullName: null,
        email: null,
        authToken: null,
    });
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = window.localStorage.getItem("authToken");
        if (!token) return setUser((prev) => ({ ...prev, authLoading: false }));

        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/authorize`, {
                JWT_TOKEN: token,
            })
            .then((response) => {
                setUser({
                    isLoggedIn: true,
                    authLoading: false,
                    fullName: response.data?.fullName,
                    email: response.data?.email,
                    authToken: token,
                });
            })
            .catch((err) => {
                window.localStorage.removeItem("authToken");
                setUser((prev) => ({
                    ...prev,
                    authLoading: false,
                    isLoggedIn: false,
                }));
            });
    }, [authToken]);

    const login = (token) => {
        window.localStorage.setItem("authToken", token);
        setAuthToken(token);
    };

    const logout = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
            .then((res) => {
                window.localStorage.removeItem("authToken");

                setUser({
                    isLoggedIn: false,
                    authLoading: false,
                    fullName: null,
                    email: null,
                    authToken: null,
                });
                setAuthToken(null);
                Router.push("/login");
                toast.success(res.data.message);
            })
            .catch((e) => toast.error("Can't Logout!"));
    };

    return (
        <authContext.Provider value={{ ...user, login, logout }}>
            {children}
        </authContext.Provider>
    );
}

export const useAuthCtx = () => {
    const authCTX = useContext(authContext);
    return authCTX;
};
