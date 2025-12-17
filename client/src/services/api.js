import axios from 'axios';

// Use environment variable or default to relative path for production
// In development, use VITE_API_URL if set, otherwise localhost
// In production (Vercel), use relative path /api which works with rewrites
const baseURL = import.meta.env.VITE_API_URL || 
                 (import.meta.env.DEV ? 'https://modulehub.onrender.com' : '/api');

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to add token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    response => response,
    error => {
        // Log network errors for debugging
        if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
            console.error('Network error - API server may be down or URL incorrect:', baseURL);
            error.response = {
                data: { msg: 'Unable to connect to server. Please check your connection.' }
            };
        }
        return Promise.reject(error);
    }
);

export default api;
