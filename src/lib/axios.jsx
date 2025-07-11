import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `https://foundup.vercel.app/api/`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('With credentials:', config.withCredentials);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized request - token may be expired');
      // Optional: redirect to login or refresh token
    }
    
    if (error.response?.status === 403) {
      console.log('Forbidden request - insufficient permissions');
    }
    
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);