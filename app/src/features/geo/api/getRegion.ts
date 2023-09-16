import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { Region } from '../types';

export type GetRegionParams = {
  id: number;
}

export type GetRegionResponse = Region;

export const getRegion = (params: GetRegionParams): Promise<GetRegionResponse> => {
  return axios.get(`/geo/regions/${params.id}`);
};

export const useGetRegion = (
  params: GetRegionParams,
  options?: Omit<UseQueryOptions<GetRegionResponse, string, GetRegionResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetRegionResponse, string>(['region', params], () => getRegion(params), { ...options });
};
