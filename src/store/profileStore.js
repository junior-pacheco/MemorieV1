import { create } from 'zustand';
import memoriesApi from '../api/memories.api';


export const storeApi = (set) => ({
  profile: null,
  readProfileId: async (profileId) => {
    memoriesApi.get(`/qr-generation/qr-data/${profileId}`)
      .then(({data: {result}}) => {
        console.log('result', result)
        set({profile: result})
      })
      .catch((error) => {
        console.log(error);
      });
  }
})

const useProfileStore = create(storeApi);

export default useProfileStore;
