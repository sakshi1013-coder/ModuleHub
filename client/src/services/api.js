import axios from 'axios';

// Base URL for API requests
// - Use VITE_API_BASE_URL if explicitly set (e.g. for pointing to Render)
// - Otherwise fall back to relative '/api' which:
//     • In development → Vite proxy forwards to http://localhost:5001/api
//     • In production (Vercel) → same-domain /api serverless function
const baseURL =
    import.meta.env.VITE_API_BASE_URL || '/api';

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
