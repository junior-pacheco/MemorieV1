import {create} from 'zustand';
import Axios from 'axios';
import useAuthStore from './authStore';

const axios = Axios.create({baseURL: `http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}`});

const useUsersStore = create((set) => ({
  data: null,
  getData: async () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${useAuthStore.getState().token}`;
    await axios.get('/qr-generation')
      .then((response) => {
        const result =  response.json();
        console.log('result', result)
        console.log('reponse', response)
        set({ data: result });
      })
      .catch((error) => {
        console.log(error);
      });
  },
}));

export default useUsersStore;