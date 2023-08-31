import { useEffect, useState } from "react";
import { GetArtworkFiltersResponse } from "../api/getArtworkFilters"
import { ArtworksFilters } from "../api/getArtworks";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

type Props = {
  filters: GetArtworkFiltersResponse,
  onChange: (filters: ArtworksFilters) => void,
};

export const ArtworksFilterForm = ({filters, onChange}: Props) => {

  const [selectedFilters, setSelectedFilters] = useState<ArtworksFilters>({
    category: [],
    sub_category: [],
    origin: [],
  });

  const [visibleFilters, setVisibleFilters] = useState<{ [k in keyof ArtworksFilters]: boolean }>({
    category: true,
    sub_category: true,
    origin: true,
  });

  useEffect(() => {
    onChange(selectedFilters);
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
    <div className="flex-1 hidden md:block text-sm">
      <div className={`font-semibold text-gray-500 mb-2 cursor-pointer flex justify-between items-center gap-4`} onClick={() => toggleFilterVisibility('category')}>
        <span>Genres</span>
        <span>
          <ChevronDownIcon className={`h-3 w-3 transform transition-transform duration-500 ${visibleFilters.category ? 'rotate-180' : ''}`} />
        </span>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ${visibleFilters.category ? 'max-h-[1000px] ease-in' : 'max-h-0 ease-out'}`}>
        {filters!.categories.map((filter) => (
          <div key={'category-' + filter.Id} className="flex gap-1 items-center mt-1">
            <input type="checkbox" id={'category-' + filter.Id} onChange={() => {handleFilterChange('category', filter.Id)}} />
            <label className="font-extralight text-gray-500" htmlFor={'category-' + filter.Id}>{filter.name}</label>
          </div>
        ))}
      </div>
      <hr className="mt-6 mb-2"/>
      <div className={`font-semibold text-gray-500 mb-2 cursor-pointer flex justify-between items-center gap-4`} onClick={() => toggleFilterVisibility('sub_category')}>
        <span>Technic</span>
        <span>
          <ChevronDownIcon className={`h-3 w-3 transform transition-transform duration-500 ${visibleFilters.sub_category ? 'rotate-180' : ''}`} />
        </span>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ${visibleFilters.sub_category ? 'max-h-[1000px] ease-in' : 'max-h-0 ease-out'}`}>
        {filters!.subCategories.map((filter) => (
          <div key={'subcategory-' + filter.Id} className="flex gap-1 items-center mt-1">
            <input type="checkbox" id={'subcategory-' + filter.Id} onChange={() => {handleFilterChange('sub_category', filter.Id)}} />
            <label className="font-extralight text-gray-500" htmlFor={'subcategory-' + filter.Id}>{filter.name}</label>
          </div>
        ))}
      </div>
      <hr className="mt-6 mb-2"/>
      <div className={`font-semibold text-gray-500 mb-2 cursor-pointer flex justify-between items-center gap-4`} onClick={() => toggleFilterVisibility('origin')}>
        <span>Regions</span>
        <span>
          <ChevronDownIcon className={`h-3 w-3 transform transition-transform duration-500 ${visibleFilters.origin ? 'rotate-180' : ''}`} />
        </span>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ${visibleFilters.origin ? 'max-h-[1000px] ease-in' : 'max-h-0 ease-out'}`}>
        {filters!.origins.map((filter) => (
          <div key={'origin-' + filter.Id} className="flex gap-1 items-center mt-1">
            <input type="checkbox" id={'origin-' + filter.Id} onChange={() => {handleFilterChange('origin', filter.Id)}} />
            <label className="font-extralight text-gray-500" htmlFor={'origin-' + filter.Id}>{filter.country}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
