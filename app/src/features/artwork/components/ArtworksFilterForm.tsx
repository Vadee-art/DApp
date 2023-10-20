import { useEffect, useState } from 'react';
import { GetArtworkFiltersResponse } from '../api/getArtworkFilters';
import { ArtworksFilters } from '../api/getArtworks';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useSearchParams } from 'react-router-dom';

type Props = {
  filters: GetArtworkFiltersResponse;
  onChange: (filters: ArtworksFilters) => void;
  filtersToDisplay?: (keyof ArtworksFilters)[];
  defaultValue?: ArtworksFilters;
};

export const ArtworksFilterForm = ({
  filters,
  onChange,
  filtersToDisplay = ['category', 'origin', 'sub_category'],
  defaultValue,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedFilters, setSelectedFilters] = useState<ArtworksFilters>(
    defaultValue || {
      category: (searchParams.get('category') && searchParams.get('category')?.split(',').map(el => +el)) || [],
      sub_category: (searchParams.get('sub_category') && searchParams.get('sub_category')?.split(',').map(el => +el)) || [],
      origin: (searchParams.get('origin') && searchParams.get('origin')?.split(',').map(el => +el)) || [],
    }
  );

  const [visibleFilters, setVisibleFilters] = useState<{ [k in keyof ArtworksFilters]: boolean }>({
    category: true,
    sub_category: true,
    origin: true,
  });

  useEffect(() => {
    onChange(selectedFilters);
    searchParams.set('category', selectedFilters.category.join(','));
    searchParams.set('sub_category', selectedFilters.sub_category.join(','));
    searchParams.set('origin', selectedFilters.origin.join(','));
    setSearchParams(searchParams);
  }, [selectedFilters]);

  const handleFilterChange = (type: keyof ArtworksFilters, value: number) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((filter) => filter !== value)
        : [...prevFilters[type], value],
    }));
  };

  const toggleFilterVisibility = (type: keyof ArtworksFilters) => {
    setVisibleFilters((prevVisibleFilters) => ({
      ...prevVisibleFilters,
      [type]: !prevVisibleFilters[type],
    }));
  };

  return (
    <div className="hidden flex-1 text-sm md:block">
      {filtersToDisplay.includes('category') && (
        <>
          <div
            className={`mb-2 flex cursor-pointer items-center justify-between gap-4 font-semibold text-gray-500`}
            onClick={() => toggleFilterVisibility('category')}
          >
            <span>Genres</span>
            <span>
              <ChevronDownIcon
                className={`h-3 w-3 transform transition-transform duration-500 ${
                  visibleFilters.category ? 'rotate-180' : ''
                }`}
              />
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              visibleFilters.category ? 'max-h-[1000px] ease-in' : 'max-h-0 ease-out'
            }`}
          >
            {filters!.categories.map((filter) => (
              <div key={'category-' + filter.Id} className="mt-1 flex items-center gap-1">
                <input
                  type="checkbox"
                  id={'category-' + filter.Id}
                  checked={selectedFilters.category.filter(c => filter.Id === c).length > 0}
                  onChange={() => {
                    handleFilterChange('category', filter.Id);
                  }}
                />
                <label className="font-extralight text-gray-500" htmlFor={'category-' + filter.Id}>
                  {filter.name}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
      {filtersToDisplay.includes('sub_category') && (
        <>
          <hr className="mb-2 mt-6" />
          <div
            className={`mb-2 flex cursor-pointer items-center justify-between gap-4 font-semibold text-gray-500`}
            onClick={() => toggleFilterVisibility('sub_category')}
          >
            <span>Technic</span>
            <span>
              <ChevronDownIcon
                className={`h-3 w-3 transform transition-transform duration-500 ${
                  visibleFilters.sub_category ? 'rotate-180' : ''
                }`}
              />
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              visibleFilters.sub_category ? 'max-h-[1000px] ease-in' : 'max-h-0 ease-out'
            }`}
          >
            {filters!.subCategories.map((filter) => (
              <div key={'subcategory-' + filter.Id} className="mt-1 flex items-center gap-1">
                <input
                  type="checkbox"
                  id={'subcategory-' + filter.Id}
                  checked={selectedFilters.sub_category.filter(s => filter.Id === s).length > 0}
                  onChange={() => {
                    handleFilterChange('sub_category', filter.Id);
                  }}
                />
                <label
                  className="font-extralight text-gray-500"
                  htmlFor={'subcategory-' + filter.Id}
                >
                  {filter.name}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
      {filtersToDisplay.includes('origin') && (
        <>
          <hr className="mb-2 mt-6" />
          <div
            className={`mb-2 flex cursor-pointer items-center justify-between gap-4 font-semibold text-gray-500`}
            onClick={() => toggleFilterVisibility('origin')}
          >
            <span>Regions</span>
            <span>
              <ChevronDownIcon
                className={`h-3 w-3 transform transition-transform duration-500 ${
                  visibleFilters.origin ? 'rotate-180' : ''
                }`}
              />
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              visibleFilters.origin ? 'max-h-[1000px] ease-in' : 'max-h-0 ease-out'
            }`}
          >
            {filters!.origins.map((filter) => (
              <div key={'origin-' + filter.Id} className="mt-1 flex items-center gap-1">
                <input
                  type="checkbox"
                  id={'origin-' + filter.Id}
                  checked={selectedFilters.origin.filter(o => filter.Id === o).length > 0}
                  onChange={() => {
                    handleFilterChange('origin', filter.Id);
                  }}
                />
                <label className="font-extralight text-gray-500" htmlFor={'origin-' + filter.Id}>
                  {filter.country}
                </label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
