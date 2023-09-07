import { axiosWithoutAuth } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Homepage } from '../types';

export type getHomepageResponse = Homepage;

export const getHomepage = (): Promise<getHomepageResponse> => {
  return axiosWithoutAuth.get('/homepage/');
};

export const useGetHomepage = () => {
  return useQuery<getHomepageResponse, string>(['homepage'], () => getHomepage());
};
