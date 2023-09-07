import { useEffect, useState } from 'react';
import { GetArtistFiltersResponse } from '../api/getArtistFilters';
import { ArtistsFilters } from '../api/getArtists';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

type Props = {
  filters: GetArtistFiltersResponse;
  onChange: (filters: ArtistsFilters) => void;
};

export const ArtistsFilterForm = ({ filters, onChange }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<ArtistsFilters>({
    origin: [],
  });

  const [visibleFilters, setVisibleFilters] = useState<{ [k in keyof ArtistsFilters]: boolean }>({
    origin: true,
  });

  useEffect(() => {
    onChange(selectedFilters);
  }, [selectedFilters]);

  const handleFilterChange = (type: keyof ArtistsFilters, value: number) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((filter) => filter !== value)
        : [...prevFilters[type], value],
    }));
  };

  const toggleFilterVisibility = (type: keyof ArtistsFilters) => {
    setVisibleFilters((prevVisibleFilters) => ({
      ...prevVisibleFilters,
      [type]: !prevVisibleFilters[type],
    }));
  };

  return (
    <div className="flex-1 hidden md:block text-sm">
      <div
        className={`font-semibold text-gray-500 mb-2 cursor-pointer flex justify-between items-center gap-4`}
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
          <div key={'origin-' + filter.Id} className="flex gap-1 items-center mt-1">
            <input
              type="checkbox"
              id={'origin-' + filter.Id}
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
    </div>
  );
};
