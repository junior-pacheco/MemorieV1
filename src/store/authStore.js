import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import Axios from 'axios';

const axios = Axios.create({baseURL: `http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}`});

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      login: async (credentials) => {
        set({ loading: true, error: null });
        await axios.post(`auth/login`, credentials)
        .then(({data: {result}}) => {
          set({token: result.token});
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            set({ loading: false });
          });
      },
      logout: () => {
        set({ token: null });
        localStorage.removeItem('auth-store');
      },
    }),
    {
      name: 'auth-store'
    },
  ),
);

export default useAuthStore;