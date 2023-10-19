import { Alert } from "@/components/Elements/Alert";
import { Pagination } from "@/components/Elements/Pagination";
import { useGetArtworksByOrigins } from "@/features/artwork/api/getArtworksByOrigins"
import { ArtworkCard, ArtworkCardSkeleton } from "@/features/artwork/components/ArtworkCard";
import { usePagination } from "@/hooks/usePagination";
import { Link } from "react-router-dom";

export const Regions = () => {
  const {page, setPage} = usePagination();
  const {data, isLoading, error} = useGetArtworksByOrigins({page});

  if (isLoading) {
    return <RegionsSkeleton />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mx-auto px-4">
      {data?.results.map((origin) => (
        <div className="mt-16 flex flex-col gap-8 md:flex-row" key={origin.Id}>
          <div className="flex-1">
            <h1 className="font-bold"> {origin.country} </h1>
          </div>
          <div className="flex-[4]">
            {origin.artworks.length === 0 && <div className="w-full h-52 flex items-center justify-center">No artworks found</div>}
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
              {origin.artworks.map((artwork) => <ArtworkCard key={artwork.Id} artwork={{...artwork, origin: {...origin}}} />)}
            </div>
              <Link className="block w-full bg-gray-olive-500 px-4 py-2 text-center text-white mt-4" to={`/regions/${origin.Id}`}>See more</Link>
          </div>
        </div>
      ))}

      <Pagination
        currentPage={page}
        totalPages={isLoading ? 1 : Math.ceil(data!.count / 9)}
        onChange={(p) => {
          setPage(p);
        }}
      />
    </div>

  );
}

const RegionsSkeleton = () => {
  return (
    <div className="container mx-auto px-4">
      {Array.from({ length: 6 }, (_, i) => (
        <div className="mt-16 flex flex-col gap-8 md:flex-row animate-pulse" key={i}>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-100"></div>
          </div>
          <div className="flex-[4]">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <ArtworkCardSkeleton key={i}/>
            ))}
            </div>
            <div className="block w-full bg-gray-olive-300 mt-4 h-10" />
          </div>
        </div>
      ))}
    </div>
  )
}