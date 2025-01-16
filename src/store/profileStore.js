import {create} from 'zustand';
import Axios from 'axios';
import useAuthStore from './authStore';

const axios = Axios.create({baseURL: `http://${import.meta.env.VITE_PUBLIC_HOST}:${import.meta.env.VITE_PUBLIC_PORT}`});

const useUProfileStore = create((set) => ({
  profile: [],
  readProfileId: async (profileId) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${useAuthStore.getState().token}`;
    await axios.get(`/qr-generation/qr-data/${profileId}`)
      .then(({data: {result}}) => {
        set({profile: result})
      })
      .catch((error) => {
        console.log(error);
      });
  },
}));

export default useUProfileStore;