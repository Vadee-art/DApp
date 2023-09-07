import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { Cart } from '../types';

export type GetCartResponse = Cart;

export const getCart = (): Promise<GetCartResponse> => {
  return axios.get('/cart/');
};

export const useGetCart = (
  options?: Omit<UseQueryOptions<GetCartResponse, string, GetCartResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetCartResponse, string>(['cart'], getCart, { ...options });
};
