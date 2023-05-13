import { axios } from '@/lib/axios';
import { AuthUser } from '../types';

export type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const register = (data: RegisterCredentials): Promise<AuthUser> => {
  return axios.post('/users/register', data);
};
