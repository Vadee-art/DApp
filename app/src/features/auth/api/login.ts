import { axios } from '@/lib/axios';
import { AuthUser } from '../types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export const register = (data: LoginCredentials): Promise<AuthUser> => {
  return axios.post('/users/login', data);
};
