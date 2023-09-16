import { axios } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { Country } from '../types';

export type GetCountryParams = {
  id: number;
}

export type GetCountryResponse = Country;

export const getCountry = (params: GetCountryParams): Promise<GetCountryResponse> => {
  return axios.get(`/geo/counties/${params.id}`);
};

export const useGetCountry = (
  params: GetCountryParams,
  options?: Omit<UseQueryOptions<GetCountryResponse, string, GetCountryResponse>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<GetCountryResponse, string>(['country', params], () => getCountry(params), { ...options });
};
