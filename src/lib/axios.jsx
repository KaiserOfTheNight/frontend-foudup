import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: `https://backend-foudup.vercel.app/api/`,
  withCredentials: true,
});
