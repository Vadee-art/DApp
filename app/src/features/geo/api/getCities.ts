import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { City } from '../types';

export type GetCitiesParams = {
  country?: number;
  region?: number;
  subregion?: number;
  page?: number;
  page_size?: number;
}

export type GetCitiesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: City[];
};

export const getCities = (params: GetCitiesParams): Promise<GetCitiesResponse> => {
  return axios.get('/geo/cities/', { params });
};

export const useGetCities = (
  params: GetCitiesParams,
  options?: Omit<UseQueryOptions<GetCitiesResponse, string, GetCitiesResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetCitiesResponse, string>(['cities', params], () => getCities(params), { ...options });
};
