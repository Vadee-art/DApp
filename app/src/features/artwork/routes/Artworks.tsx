import { useGetArtworks } from "../api/getArtworks";
import { Artwork } from "../components/Artwork";

export const Artworks = () => {
  const { data, isLoading, error } = useGetArtworks({});
  console.log(data);
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.results.map((artwork) => (
          <Artwork key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}