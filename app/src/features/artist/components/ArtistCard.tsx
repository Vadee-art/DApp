import { Link } from 'react-router-dom';
import { Artist as ArtistType } from '../types';

type ArtistProps = {
  artist: ArtistType;
};

export const ArtistCard = ({ artist }: ArtistProps) => {
  return (
    <Link to={`/artists/${artist.Id}`} className="flex cursor-pointer flex-col gap-8 self-end">
      <img src={artist.photo} alt="artist photo" className="bject-contain w-full" loading="lazy" />
      <div className="flex flex-col text-sm font-extralight">
        <h3 className="font-medium">{artist.name}</h3>
        <span>{artist.origin.country}</span>
      </div>
    </Link>
  );
};

export const ArtistCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-8 self-end">
      <div className={`h-72 w-full bg-gray-200`} />
      <div className="flex flex-col gap-2 text-sm font-extralight">
        <div className="h-4 w-[200px] bg-gray-200" />
        <div className="h-4 w-[100px] bg-gray-200" />
      </div>
    </div>
  );
};
