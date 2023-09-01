import { Link } from 'react-router-dom';
import { Artwork as ArtworkType } from '../types'

type ArtworkProps = {
  artwork: ArtworkType;
};

export const ArtworkCard = ({
  artwork
}: ArtworkProps) => {
  return (
    <Link to={`/artworks/${artwork.Id}`} className="cursor-pointer flex flex-col gap-8 self-end">
      <img src={artwork.imageMediumQuality} alt="sample pic" className='w-full bject-contain' loading='lazy' />
      <div className='flex flex-col text-sm font-extralight'>
        <h3 className='font-medium'>
          {artwork.artist.name}
        </h3>
        <span>
          {artwork.title}
        </span>
        <span>
          {artwork.origin.country}
        </span>
        <span>
          ${artwork.price}
        </span>
      </div>
    </Link>
  )
}

export const ArtworkCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 self-end animate-pulse">
      <div className={`w-full h-52 bg-gray-200`} />
      <div className='flex flex-col gap-2 text-sm font-extralight'>
        <div className='w-[200px] h-4 bg-gray-200' />
        <div className='w-[100px] h-4 bg-gray-200' />
        <div className='w-[100px] h-4 bg-gray-200' />
        <div className='w-[100px] h-4 bg-gray-200' />
      </div>
    </div>
  )
}