import { axiosWithoutAuth } from "@/lib/axios"
import { UseQueryOptions, useQuery } from "react-query";
import { Artist } from "../types";

export type GetSimilarArtistsParams = {
  artistId: number;
  page?: number;
  page_size?: number;
}

export type GetSimilarArtistsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Artist[];
}

export const getSimilarArtists = ({
  artistId,
  page = 1,
  page_size = 9,
}: GetSimilarArtistsParams) : Promise<GetSimilarArtistsResponse> => {
  return axiosWithoutAuth.get(`/artists/${artistId}/similar`, {
    params: {
      page, page_size
    }
  });
}

export const useGetSimilarArtists = (params: GetSimilarArtistsParams, options?: Omit<UseQueryOptions<GetSimilarArtistsResponse, string, GetSimilarArtistsResponse>, "queryKey" | "queryFn">) => {
  return useQuery<GetSimilarArtistsResponse, string>(['similar-artists', params], () => getSimilarArtists(params), {...options});
}