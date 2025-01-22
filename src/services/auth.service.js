import { AxiosError } from 'axios';
import memoriesApi from '../api/memories.api'

export class AuthService {
  static login = async (userName, userPassword) => {
    try {
      const data = memoriesApi.post('/auth/login', userName, userPassword);
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response.data);
        throw error.response.data
      }

      throw new Error('Unable to login')
    }
  }
}