import { axiosWithoutAuth } from '@/lib/axios';
import { AuthUser } from '../types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export const login = (data: LoginCredentials): Promise<AuthUser> => {
  return axiosWithoutAuth.post('/users/login/', data);
};

export type LoginWeb3Credentials = {
  msg: string;
  sig: string;
};

export const loginWeb3 = (data: LoginWeb3Credentials): Promise<AuthUser> => {
  return axiosWithoutAuth.post('/users/login-web3/', data);
};
