import {create} from 'zustand';
import memoriesApi from '../api/memories.api';

export const storeApi = (set, get) => ({
  data: [],
  getData: async () => {
    await memoriesApi.get('/qr-generation')
      .then(({data: {result}}) => {
        set({data: result})
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteUser: async (userId) => {
    await memoriesApi.delete(`/qr-generation/${userId}`)
      .then(({data: {result}}) => {
        console.log(get().data);
        const data = get().data.filter(user => user.qrId !== result);
        console.log(data);
        set({data: data})
      })
      .catch((error) => {
        console.log(error);
      });
  }
})


const useUsersStore = create(storeApi);

export default useUsersStore;