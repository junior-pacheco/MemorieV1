import {create} from 'zustand';
import { AuthService } from '../services/auth.service';
import { devtools, persist } from 'zustand/middleware';

export const storeApi = (set) => ({
  status: 'unauthorized',
  token: undefined,

  loginUser: async (userName, userPassword) => {
    try {
      const { data: {result} } = await AuthService.login(userName, userPassword);
      set({status: 'authorized', token: result.token});
    } catch (error) {
      console.log(error);
      set({status: 'unauthorized', token: undefined});
    }
  },
  logoutUser: () => {
    set({status: 'unauthorized', token: undefined});
  }

})


const useAuthStore = create(
  devtools(
    persist(
      storeApi,
      {name: 'auth-store',}
    )
  )
);

export default useAuthStore;
