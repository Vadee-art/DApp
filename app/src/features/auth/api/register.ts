import { axios } from '@/lib/axios';
import { AuthUser } from '../types';
import { useMutation } from 'react-query';

export type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export const register = (data: RegisterCredentials): Promise<AuthUser> => {
  return axios.post('/users/register', data);
};

export const useRegister = (onSuccess: any) => {
  return useMutation(register, {
    onSuccess: (data: AuthUser) => {
      onSuccess();
    },
  });
}
