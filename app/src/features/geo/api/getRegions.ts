import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { Region } from '../types';

export type GetRegionsParams = {
  country?: number;
  page?: number;
  page_size?: number;
}

export type GetRegionsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Region[];
};

export const getRegions = (params: GetRegionsParams): Promise<GetRegionsResponse> => {
  return axios.get('/geo/regions/', { params });
};

export const useGetRegions = (
  params: GetRegionsParams,
  options?: Omit<UseQueryOptions<GetRegionsResponse, string, GetRegionsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetRegionsResponse, string>(['regions', params], () => getRegions(params), { ...options });
};
