import { Artwork as ArtworkType } from '../types'

type ArtworkProps = {
  artwork: ArtworkType;
};

export const Artwork = ({
  artwork
}: ArtworkProps) => {
  return (
    <div className="flex flex-col gap-8 self-end">
      <img src={artwork.image} alt="sample pic" className='w-full bject-contain' height={artwork.height} width={artwork.width} loading='lazy' />
      <div className='flex flex-col text-sm font-extralight'>
        <h3 className='font-medium'>
          {artwork.title}
        </h3>
        <span>
          unknown
        </span>
        <span>
          {artwork.origin.country}
        </span>
        <span>
          ${artwork.price}
        </span>
      </div>
    </div>
  )
}

export const ArtworkSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 self-end">
      <div className={`w-full h-52 bg-gray-200 animate-pulse`} />
      <div className='flex flex-col gap-2 text-sm font-extralight'>
        <div className='w-[200px] h-4 bg-gray-200 animate-pulse' />
        <div className='w-[100px] h-4 bg-gray-200 animate-pulse' />
        <div className='w-[100px] h-4 bg-gray-200 animate-pulse' />
        <div className='w-[100px] h-4 bg-gray-200 animate-pulse' />
      </div>
    </div>
  )
}