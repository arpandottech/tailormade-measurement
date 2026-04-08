import axios from 'axios';

// Get API URL from window location if not provided in environment
const baseURL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (e.g., adding tokens automatically)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (e.g., handling unauthorized errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      // window.location.href = '/admin'; // Optional: Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
