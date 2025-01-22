import axios from 'axios';
import useAuthStore from '../store/authStore';


const memoriesApi = axios.create({
  baseURL: `http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}`
})

memoriesApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
)

export default memoriesApi