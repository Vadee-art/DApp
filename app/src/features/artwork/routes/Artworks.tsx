import { Alert } from '@/components/Elements/Alert';
import { ArtworksFilters, useGetArtworks } from '../api/getArtworks';
import { ArtworkCard, ArtworkCardSkeleton } from '../components/ArtworkCard';
import { Pagination } from '@/components/Elements/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useGetArtworkFilters } from '../api/getArtworkFilters';
import { ArtworksFilterForm } from '../components/ArtworksFilterForm';
import { useState } from 'react';

export const Artworks = () => {
  const { page, setPage } = usePagination();
  const [artworksFilters, setArtworksFilters] = useState<ArtworksFilters>({
    category: [],
    sub_category: [],
    origin: [],
  });
  const { data, isLoading, error } = useGetArtworks({ page, ...artworksFilters });
  const { data: filters, isLoading: filtersLoading, error: filtersError } = useGetArtworkFilters();

  if (error || filtersError) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mt-16 flex flex-col gap-8 md:flex-row">
        <h1 className="flex-1 font-bold">Artworks</h1>
        <p className="flex-[4]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates incidunt soluta
          officia distinctio eius, veritatis molestiae, unde deserunt magnam minima ea nisi
          reprehenderit dicta possimus asperiores quia, a quo eum? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Nesciunt repellat reprehenderit veritatis, neque error in
          quia sapiente, corporis atque quo illum recusandae porro et a! Laudantium vel deleniti ut
          adipisci?
        </p>
      </div>
      <div className="mt-16 flex flex-row gap-8">
        {filtersLoading ? (
          <div className="hidden flex-1 animate-pulse bg-gray-200 md:block"></div>
        ) : (
          <ArtworksFilterForm
            filters={filters!}
            onChange={(filters) => {
              setArtworksFilters(filters);
            }}
          />
        )}
        <div className="flex-[4]">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
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
