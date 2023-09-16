import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { SubRegion } from '../types';

export type GetSubRegionsParams = {
  country?: number;
  region?: number;
  page?: number;
  page_size?: number;
}

export type GetSubRegionsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SubRegion[];
};

export const getSubRegions = (params: GetSubRegionsParams): Promise<GetSubRegionsResponse> => {
  return axios.get('/geo/subregions/', { params });
};

export const useGetSubRegions = (
  params: GetSubRegionsParams,
  options?: Omit<UseQueryOptions<GetSubRegionsResponse, string, GetSubRegionsResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetSubRegionsResponse, string>(['subregions', params], () => getSubRegions(params), { ...options });
};
