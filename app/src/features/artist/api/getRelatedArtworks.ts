import { Artwork } from "@/features/artwork/types";
import { axiosWithoutAuth } from "@/lib/axios"
import { UseQueryOptions, useQuery } from "react-query";

export type GetRelatedArtworksParams = {
  artistId: number;
  page?: number;
  page_size?: number;
}

export type GetRelatedArtworksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Artwork[];
}

export const getRelatedArtworks = ({
  artistId,
  page = 1,
  page_size = 9,
}: GetRelatedArtworksParams) : Promise<GetRelatedArtworksResponse> => {
  return axiosWithoutAuth.get(`/artists/${artistId}/related-artworks`, {
    params: {
      page, page_size
    }
  });
}

export const useGetRelatedArtworks = (params: GetRelatedArtworksParams, options?: Omit<UseQueryOptions<GetRelatedArtworksResponse, string, GetRelatedArtworksResponse>, "queryKey" | "queryFn">) => {
  return useQuery<GetRelatedArtworksResponse, string>(['related-artworks', params], () => getRelatedArtworks(params), {...options});
}