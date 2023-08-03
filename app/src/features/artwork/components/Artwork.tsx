import { Artwork as ArtworkType } from '../types'

type ArtworkProps = {
  artwork: ArtworkType;
};

export const Artwork = ({
  artwork
}: ArtworkProps) => {
  console.log(artwork);
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