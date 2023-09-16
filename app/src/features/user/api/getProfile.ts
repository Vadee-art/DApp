import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { User } from '../types';

export type GetProfileParams = {
  id: number;
}

export type GetProfileResponse = User;

export const getProfile = (params: GetProfileParams): Promise<GetProfileResponse> => {
  return axios.get(`/users/profile/${params.id}`);
};

export const useGetProfile = (
  params: GetProfileParams,
  options?: Omit<UseQueryOptions<GetProfileResponse, string, GetProfileResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetProfileResponse, string>(['profile'], () => getProfile(params), { ...options });
};
