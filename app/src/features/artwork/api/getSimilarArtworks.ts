import { Artwork } from '@/features/artwork/types';
import { axiosWithoutAuth } from '@/lib/axios';
import { UseQueryOptions, useQuery } from 'react-query';

export type GetSimilarArtworksParams = {
  artworkId: number;
  page?: number;
  page_size?: number;
};

export type GetSimilarArtworksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Artwork[];
};

export const getSimilarArtworks = ({
  artworkId,
  page = 1,
  page_size = 9,
}: GetSimilarArtworksParams): Promise<GetSimilarArtworksResponse> => {
  return axiosWithoutAuth.get(`/artworks/${artworkId}/similar`, {
    params: {
      page,
      page_size,
    },
  });
};

export const useGetSimilarArtworks = (
  params: GetSimilarArtworksParams,
  options?: Omit<
    UseQueryOptions<GetSimilarArtworksResponse, string, GetSimilarArtworksResponse>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetSimilarArtworksResponse, string>(
    ['related-artworks', params],
    () => getSimilarArtworks(params),
    { ...options }
  );
};
