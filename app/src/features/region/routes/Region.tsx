import { Alert } from '@/components/Elements/Alert';
import { Pagination } from '@/components/Elements/Pagination';
import { useGetArtworkFilters } from '@/features/artwork/api/getArtworkFilters';
import { ArtworksFilters, useGetArtworks } from '@/features/artwork/api/getArtworks';
import { ArtworkCard, ArtworkCardSkeleton } from '@/features/artwork/components/ArtworkCard';
import { ArtworksFilterForm } from '@/features/artwork/components/ArtworksFilterForm';
import { usePagination } from '@/hooks/usePagination';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const Region = () => {
  const { id } = useParams();
  const { page, setPage } = usePagination();
  const [artworksFilters, setArtworksFilters] = useState<ArtworksFilters>({
    category: [],
    sub_category: [],
    origin: [id ? +id : 0],
  });
  const { data, isLoading, error } = useGetArtworks({ page, ...artworksFilters });
  const { data: filters, isLoading: filtersLoading, error: filtersError } = useGetArtworkFilters();

  if (error || filtersError) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mx-auto px-4">
      {data?.results && data.results.length > 0 ? (
        // TODO: read origin data properly, when there is no artwork for this origin, the origin data is not fetched
        <div className="flex flex-col md:flex-row gap-8 mt-16">
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-bold"> {data?.results[0].origin.country} </h1>
            <img
              className="w-14 h-auto object-cover object-center mb-4"
              src={data?.results[0].origin.flag}
              alt="flag"
            />
          </div>
          <p className="flex-[4] whitespace-pre-line">{data?.results[0].origin.description}</p>
        </div>
      ) : (
        <RegionDescriptionSkeleton />
      )}
      <div className="flex flex-row gap-8 mt-16">
        {filtersLoading ? (
          <div className="bg-gray-200 animate-pulse flex-1 hidden md:block"></div>
        ) : (
          <ArtworksFilterForm
            filtersToDisplay={['category', 'sub_category']}
            filters={filters!}
            defaultValue={artworksFilters}
            onChange={(filters) => {
              setArtworksFilters(filters);
            }}
          />
        )}
        <div className="flex-[4]">
          <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {isLoading
              ? Array.from({ length: 9 }, (_, i) => <ArtworkCardSkeleton key={i} />)
              : data!.results.map((artwork) => <ArtworkCard key={artwork.Id} artwork={artwork} />)}
          </div>
          <Pagination
            currentPage={page}
            totalPages={isLoading ? 1 : Math.ceil(data!.count / 9)}
            onChange={(p) => {
              setPage(p);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const RegionDescriptionSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col md:flex-row gap-8 mt-16">
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-gray-200 w-12 h-4"></div>
        <div className="bg-gray-200 w-14 h-8"></div>
      </div>
      <p className="flex-[4] whitespace-pre-line">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="bg-gray-200 w-full h-4 mb-2"></div>
        ))}
      </p>
    </div>
  );
};
