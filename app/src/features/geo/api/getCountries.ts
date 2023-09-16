import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { Country } from '../types';

export type GetCountriesParams = {
  page?: number;
  page_size?: number;
}

export type GetCountriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Country[];
};

export const getCountries = (params: GetCountriesParams): Promise<GetCountriesResponse> => {
  return axios.get('/geo/counties/', { params });
};

export const useGetCountries = (
  params: GetCountriesParams,
  options?: Omit<UseQueryOptions<GetCountriesResponse, string, GetCountriesResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetCountriesResponse, string>(['countries', params], () => getCountries(params), { ...options });
};
