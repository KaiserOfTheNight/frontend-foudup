import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: `https://foundup-api.vercel.app/api/`,
  withCredentials: true,
});

