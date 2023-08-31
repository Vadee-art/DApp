import { Alert } from "@/components/Elements/Alert";
import { ArtworksFilters, useGetArtworks } from "../api/getArtworks";
import { Artwork, ArtworkSkeleton } from "../components/Artwork";
import { Pagination } from "@/components/Elements/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useGetArtworkFilters } from "../api/getArtworkFilters";
import { ArtworksFilterForm } from "../components/ArtworksFilterForm";
import { useState } from "react";

export const Artworks = () => {
  const {page, setPage} = usePagination();
  const [artworksFilters, setArtworksFilters] = useState<ArtworksFilters>({
    category: [],
    sub_category: [],
    origin: [],
  });
  const { data, isLoading, error } = useGetArtworks({page, ...artworksFilters});
  const {
    data: filters,
    isLoading: filtersLoading,
    error: filtersError,
  } = useGetArtworkFilters();

  if (error || filtersError) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <h1 className="flex-1 font-bold">Artworks</h1>
        <p className="flex-[4]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates incidunt soluta officia distinctio eius, veritatis molestiae, unde deserunt magnam minima ea nisi reprehenderit dicta possimus asperiores quia, a quo eum?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt repellat reprehenderit veritatis, neque error in quia sapiente, corporis atque quo illum recusandae porro et a! Laudantium vel deleniti ut adipisci?
        </p>
      </div>
      <div className="flex flex-row gap-8 mt-16">
        {filtersLoading ? (
          <div className="bg-gray-200 animate-pulse flex-1 hidden md:block"></div>
        ) : (
          <ArtworksFilterForm filters={filters!} onChange={
            (filters) => {
              setArtworksFilters(filters);
            }
          }/>
        )}
        <div className="flex-[4]">
          <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {isLoading ? 
              Array.from({ length: 9 }, (_, i) => <ArtworkSkeleton key={i} />) : 
              data!.results.map((artwork) => (
                <Artwork key={artwork.Id} artwork={artwork} />
              ))
            }
          </div>
          <Pagination           
            currentPage={page}
            totalPages={isLoading ? 1 : Math.ceil(data!.count/9)}
            onChange={(p) => {
              setPage(p);
            }}/>
        </div>
      </div>
    </div>
  );
}