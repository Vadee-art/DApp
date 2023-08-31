import { Origin } from "@/features/artwork/types";
import { axiosWithoutAuth } from "@/lib/axios"
import { useQuery } from "react-query";

export type GetArtistFiltersResponse = {
  origins: Origin[];
  // achievements: string[];
}

export const getArtistFilters = () : Promise<GetArtistFiltersResponse> => {
  return axiosWithoutAuth.get('/artists/filters');
}

export const useGetArtistFilters = () => {
  return useQuery<GetArtistFiltersResponse, string>(['artist-filters'], () => getArtistFilters());
}