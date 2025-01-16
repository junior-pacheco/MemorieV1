import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const axios = Axios.create({baseURL: `http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}`});

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      login: async (credentials) => {
        set({ loading: true, error: null });
        await axios.post(`auth/login`, credentials)
        .then(({data : {result}}) => {
          console.log('result', result)
            // const navigate = useNavigate()
            set({token: result.token});
            // navigate('/users')
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            set({ loading: false });
          });
      },
    }),
    {
      name: 'auth-store',
      storage: {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
      },
    },
  ),
);

export default useAuthStore;