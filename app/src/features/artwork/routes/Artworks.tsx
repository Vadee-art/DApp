import { Alert } from "@/components/Elements/Alert";
import { useGetArtworks } from "../api/getArtworks";
import { Artwork, ArtworkSkeleton } from "../components/Artwork";

export const Artworks = () => {
  const { data, isLoading, error } = useGetArtworks({});

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? 
          Array.from({ length: 9 }, (_, i) => <ArtworkSkeleton key={i} />) : 
          data!.results.map((artwork) => (
            <Artwork key={artwork.Id} artwork={artwork} />
          ))
        }
      </div>
    </div>
  );
}