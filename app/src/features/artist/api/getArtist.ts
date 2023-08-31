import { axiosWithoutAuth } from "@/lib/axios";
import { Artist } from "../types";
import { UseQueryOptions, useQuery } from "react-query";
import { Artwork } from "@/features/artwork/types";

export type getArtistParams = {
  id: number;
};

export type getArtistResponse = Artist & {
  artworks: Artwork[];
}

export const getArtist = ({ id }: getArtistParams): Promise<getArtistResponse> => {
    return axiosWithoutAuth.get('/artists/' + id);
}

export const useGetArtist = (params: getArtistParams, options?: Omit<UseQueryOptions<getArtistResponse, string, getArtistResponse>, "queryKey" | "queryFn">) => {
  return useQuery<getArtistResponse, string>(['artist', params], () => getArtist(params), {
    ...options,
  });
}
