import { axiosWithoutAuth } from "@/lib/axios"
import { useQuery } from "react-query";
import { Artwork } from "../types";

export type getArtworksParams = {
  page?: number;
  page_size?: number;
};

export type getArtworksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Artwork[];
}

export const getArtworks = ({
  page = 1,
  page_size = 9,
} : getArtworksParams) : Promise<getArtworksResponse> => {
  return axiosWithoutAuth.get('/artworks', {
    params: {
      page,
      page_size,
    },
  });
}

export const useGetArtworks = (params: getArtworksParams) => {
  return useQuery<getArtworksResponse, string>(['artworks', params], () => getArtworks(params));
}