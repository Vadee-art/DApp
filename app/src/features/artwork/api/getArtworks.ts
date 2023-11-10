import { axiosWithoutAuth } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Artwork } from '../types';

export type ArtworksFilters = {
  genre: number[];
  origin: number[];
  technique: number[];
};

export type getArtworksParams = {
  page?: number;
  page_size?: number;
} & ArtworksFilters;

export type getArtworksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Artwork[];
};

export const getArtworks = ({
  page = 1,
  page_size = 9,
  genre,
  technique,
  origin,
}: getArtworksParams): Promise<getArtworksResponse> => {
  return axiosWithoutAuth.get('/artworks', {
    params: {
      page,
      page_size,
      genre: genre?.join(','),
      technique: technique?.join(','),
      origin: origin?.join(','),
    },
  });
};

export const useGetArtworks = (params: getArtworksParams) => {
  return useQuery<getArtworksResponse, string>(['artworks', params], () => getArtworks(params));
};
