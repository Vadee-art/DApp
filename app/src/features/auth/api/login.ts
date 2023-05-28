import { axiosWithoutAuth } from '@/lib/axios';
import { AuthUser } from '../types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export const login = (data: LoginCredentials): Promise<AuthUser> => {
  return axiosWithoutAuth.post('/users/login/', data);
};
