import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { City } from '../types';

export type GetCityParams = {
  id: number;
}

export type GetCityResponse = City;

export const getCity = (params: GetCityParams): Promise<GetCityResponse> => {
  return axios.get(`/geo/subregions/${params.id}`);
};

export const useGetCity = (
  params: GetCityParams,
  options?: Omit<UseQueryOptions<GetCityResponse, string, GetCityResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetCityResponse, string>(['city', params], () => getCity(params), { ...options });
};
