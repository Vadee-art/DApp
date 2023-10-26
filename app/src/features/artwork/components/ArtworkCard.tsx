import { Link } from 'react-router-dom';
import { Artwork } from '../types';
import { Artist } from '@/features/artist/types';

type ArtworkProps = {
  artwork: Pick<Artwork, 'Id' | 'imageMediumQuality' | 'title' | 'price'> & {
    artist: Pick<Artist, 'name' | 'origin'>;
  }
};

export const ArtworkCard = ({ artwork }: ArtworkProps) => {
  return (
    <Link
      to={`/artworks/${artwork.Id}`}
      className="flex cursor-pointer flex-col gap-8 self-end border border-gray-300"
    >
      <img
        src={artwork.imageMediumQuality}
        alt="sample pic"
        className="bject-contain w-full"
        loading="lazy"
      />
      <div className="flex flex-col p-2 text-sm font-extralight">
        <h3 className="font-medium">{artwork.artist.name}</h3>
        <span>{artwork.title}</span>
        <span>{artwork.artist.origin.country}</span>
        <span>${artwork.price}</span>
      </div>
    </Link>
  );
};

export const ArtworkCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-8 self-end">
      <div className={`h-52 w-full bg-gray-200`} />
      <div className="flex flex-col gap-2 text-sm font-extralight">
        <div className="h-4 w-[200px] bg-gray-200" />
        <div className="h-4 w-[100px] bg-gray-200" />
        <div className="h-4 w-[100px] bg-gray-200" />
        <div className="h-4 w-[100px] bg-gray-200" />
      </div>
    </div>
  );
};
