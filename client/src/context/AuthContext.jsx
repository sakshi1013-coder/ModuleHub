import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    setUser(res.data);
                } catch (err) {
                    console.error(err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.token && res.data.user) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                return { success: true };
            } else {
                return { success: false, error: 'Invalid response from server' };
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.msg || 
                               err.response?.data?.error || 
                               err.message || 
                               'Login failed. Please check your credentials.';
            return { success: false, error: errorMessage };
        }
    };

    const register = async (formData) => {
        try {
            const res = await api.post('/auth/register', formData);
            if (res.data.token && res.data.user) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                return { success: true, companyCode: res.data.companyCode }; // Return code if new company
            } else {
                return { success: false, error: 'Invalid response from server' };
            }
        } catch (err) {
            console.error('Registration error:', err);
            const errorMessage = err.response?.data?.msg || 
                               err.response?.data?.error || 
                               err.message || 
                               'Registration failed. Please try again.';
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
