import { axiosWithoutAuth } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Genre, Origin, Technique } from '../types';

export type GetArtworkFiltersResponse = {
  origins: Origin[];
  techniques: Technique[];
  categories: Genre[];
};

export const getArtworkFilters = (): Promise<GetArtworkFiltersResponse> => {
  return axiosWithoutAuth.get('/artworks/filters/');
};

export const useGetArtworkFilters = () => {
  return useQuery<GetArtworkFiltersResponse, string>(['artwork-filters'], () =>
    getArtworkFilters()
  );
};
