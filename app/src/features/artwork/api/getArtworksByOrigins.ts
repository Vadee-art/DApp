import { axiosWithoutAuth } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Artwork, Origin } from '../types';
import { Artist } from '@/features/artist/types';

export type GetArtworksByOriginsParams = {
  page?: number;
  page_size?: number;
};

export type GetArtworksByOriginsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: (Origin & {
    artworks: (Pick<Artwork, 'Id' | 'price' | 'image' | 'title' | 'imageMediumQuality' | 'origin'> & {
      artist: Pick<Artist, 'Id' | 'name'>;
    })[];
  })[];
};

export const getArtworksByOrigins = ({
  page = 1,
  page_size = 3,
}: GetArtworksByOriginsParams): Promise<GetArtworksByOriginsResponse> => {
  return axiosWithoutAuth.get('/artworks/by-origins/', {
    params: {
      page,
      page_size,
    },
  });
};

export const useGetArtworksByOrigins = (params: GetArtworksByOriginsParams) => {
  return useQuery<GetArtworksByOriginsResponse, string>(['artworks', params], () => getArtworksByOrigins(params));
};
