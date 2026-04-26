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

let apiRequestsCount = 0;

// Add a request interceptor to add token
api.interceptors.request.use(
    config => {
        apiRequestsCount++;
        if (window.showLoader && apiRequestsCount === 1) {
            window.showLoader();
        }
        
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    error => {
        apiRequestsCount--;
        if (apiRequestsCount <= 0 && window.hideLoader) {
            apiRequestsCount = 0;
            window.hideLoader();
        }
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    response => {
        apiRequestsCount--;
        if (apiRequestsCount <= 0 && window.hideLoader) {
            apiRequestsCount = 0;
            window.hideLoader();
        }
        return response;
    },
    error => {
        apiRequestsCount--;
        if (apiRequestsCount <= 0 && window.hideLoader) {
            apiRequestsCount = 0;
            window.hideLoader();
        }
        
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
