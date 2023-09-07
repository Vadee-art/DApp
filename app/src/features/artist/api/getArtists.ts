import { axiosWithoutAuth } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Artist } from '../types';

export type ArtistsFilters = {
  origin: number[];
  // achievements: number[];
};

export type GetArtistsParams = {
  page?: number;
  page_size?: number;
} & ArtistsFilters;

export type GetArtistsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Artist[];
};

export const getArtists = ({
  page = 1,
  page_size = 9,
  origin,
}: GetArtistsParams): Promise<GetArtistsResponse> => {
  return axiosWithoutAuth.get('/artists', {
    params: {
      page,
      page_size,
      origin: origin,
      // achievements: achievements?.join(','),
    },
  });
};

export const useGetArtists = (params: GetArtistsParams) => {
  return useQuery<GetArtistsResponse, string>(['artists', params], () => getArtists(params));
};
