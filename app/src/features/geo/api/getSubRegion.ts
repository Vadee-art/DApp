import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { SubRegion } from '../types';

export type GetSubRegionParams = {
  id: number;
}

export type GetSubRegionResponse = SubRegion;

export const getSubRegion = (params: GetSubRegionParams): Promise<GetSubRegionResponse> => {
  return axios.get(`/geo/subregions/${params.id}`);
};

export const useGetSubRegion = (
  params: GetSubRegionParams,
  options?: Omit<UseQueryOptions<GetSubRegionResponse, string, GetSubRegionResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetSubRegionResponse, string>(['subregion', params], () => getSubRegion(params), { ...options });
};
