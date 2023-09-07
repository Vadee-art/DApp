import { axiosWithoutAuth } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Category, Origin, SubCategory } from '../types';

export type GetArtworkFiltersResponse = {
  origins: Origin[];
  subCategories: SubCategory[];
  categories: Category[];
};

export const getArtworkFilters = (): Promise<GetArtworkFiltersResponse> => {
  return axiosWithoutAuth.get('/artworks/filters/');
};

export const useGetArtworkFilters = () => {
  return useQuery<GetArtworkFiltersResponse, string>(['artwork-filters'], () =>
    getArtworkFilters()
  );
};
