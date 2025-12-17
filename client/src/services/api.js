import axios from 'axios';

// Base URL for API requests
// - Prefer VITE_API_URL when provided
// - In development, default to local backend
// - In production (Vercel), talk directly to the Render backend
const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5001/api' : 'https://modulehub.onrender.com/api');

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
