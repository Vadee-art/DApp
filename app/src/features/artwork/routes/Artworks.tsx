import { Alert } from "@/components/Elements/Alert";
import { useGetArtworks } from "../api/getArtworks";
import { Artwork, ArtworkSkeleton } from "../components/Artwork";
import { Pagination } from "@/components/Elements/Pagination";
import { usePagination } from "@/hooks/usePagination";

export const Artworks = () => {
  const {page, setPage} = usePagination();
  const { data, isLoading, error } = useGetArtworks({page});

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row gap-8 mt-16">
        <h1 className="flex-1 font-bold">Artworks</h1>
        <p className="flex-[4]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates incidunt soluta officia distinctio eius, veritatis molestiae, unde deserunt magnam minima ea nisi reprehenderit dicta possimus asperiores quia, a quo eum?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt repellat reprehenderit veritatis, neque error in quia sapiente, corporis atque quo illum recusandae porro et a! Laudantium vel deleniti ut adipisci?
        </p>
      </div>
      <div className="flex flex-row gap-8 mt-16">
        <div className="bg-gray-200 animate-pulse flex-1"></div>
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
            totalPages={20} //TODO: replace with api data
            onChange={(p) => {
              setPage(p);
            }}/>
        </div>
      </div>
    </div>
  );
}