import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: `https://foundup.vercel.app/api/`,
  withCredentials: true,
});

