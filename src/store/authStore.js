import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const axios = Axios.create({baseURL: `http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}`});

<ToastContainer
position="top-center"
autoClose={2000}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
theme="colored"
/>

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
            toast.error("Hubo un error");
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