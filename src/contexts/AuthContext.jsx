import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser, loginUser, logoutUser, registerUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await getUser();
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);


    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            setUser(response.data);
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error;
        }
    };

    const register = async (userInfo) => {
        try {
            const response = await registerUser(userInfo);
            setUser(response.data);
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
