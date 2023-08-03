import { axios, axiosWithoutAuth } from "@/lib/axios"
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
  page_size = 30,
} : getArtworksParams) : Promise<getArtworksResponse> => {
  return axiosWithoutAuth.get('/artworks', {
    params: {
      page,
      page_size,
    },
  });
}

export const useGetArtworks = (params: getArtworksParams) => {
  return useQuery(['artworks', params], () => getArtworks(params));
}