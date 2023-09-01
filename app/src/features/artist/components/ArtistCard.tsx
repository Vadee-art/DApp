import { Link } from 'react-router-dom';
import { Artist as ArtistType } from '../types'

type ArtistProps = {
  artist: ArtistType;
};

export const ArtistCard = ({
  artist
}: ArtistProps) => {
  return (
    <Link to={`/artists/${artist.Id}`} className="cursor-pointer flex flex-col gap-8 self-end">
      <img src={artist.photo} alt="artist photo" className='w-full bject-contain' loading='lazy' />
      <div className='flex flex-col text-sm font-extralight'>
        <h3 className='font-medium'>
          {artist.name}
        </h3>
        <span>
          {artist.origin.country}
        </span>
      </div>
    </Link>
  )
}

export const ArtistCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 self-end">
      <div className={`w-full h-72 bg-gray-200 animate-pulse`} />
      <div className='flex flex-col gap-2 text-sm font-extralight'>
        <div className='w-[200px] h-4 bg-gray-200 animate-pulse' />
        <div className='w-[100px] h-4 bg-gray-200 animate-pulse' />
      </div>
    </div>
  )
}