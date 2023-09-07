import { axiosWithoutAuth } from "@/lib/axios"
import { useQuery } from "react-query";
import { Artwork } from "../types";

export type ArtworksFilters = {
  category: number[];
  origin: number[];
  sub_category: number[];
}

export type getArtworksParams = {
  page?: number;
  page_size?: number;
} & ArtworksFilters;

export type getArtworksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Artwork[];
}

export const getArtworks = ({
  page = 1,
  page_size = 9,
  category, sub_category, origin
} : getArtworksParams) : Promise<getArtworksResponse> => {
  return axiosWithoutAuth.get('/artworks', {
    params: {
      page,
      page_size,
      category: category,
      sub_category: sub_category,
      origin: origin,
    },
  });
}

export const useGetArtworks = (params: getArtworksParams) => {
  return useQuery<getArtworksResponse, string>(['artworks', params], () => getArtworks(params));
}