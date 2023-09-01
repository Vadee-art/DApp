import {register} from 'swiper/element/bundle'
import { useParams } from "react-router-dom"
import { useGetArtwork } from "../api/getArtwork";
import { Alert } from "@/components/Elements/Alert";
import { Button } from "@/components/Elements";
import { useGetArtist } from "@/features/artist/api/getArtist";
import { ArtworkCard, ArtworkCardSkeleton } from "../components/ArtworkCard";
import { useGetRelatedArtworks } from '@/features/artist/api/getRelatedArtworks';
import { useGetSimilarArtists } from '@/features/artist/api/getSimilarArtists';

register();

export const Artwork = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetArtwork({ id: +id! })
  const { data: artist, isLoading: artistLoading, error: artistError } = useGetArtist({ id: data?.artist.Id || 0 }, { enabled: !!data })

  if (error || artistError) {
    return <Alert variant="danger">{error}</Alert>
  }

  if (isLoading || artistLoading) {
    return <ArtworkSkeleton />;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="flex-[3]">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col md:self-end">
              <span>Save</span>
              <span>View in Room</span>
              <span>Share</span>
            </div>
            <div className="flex-[4]">
              <img src={data!.image} alt={data!.title} loading="lazy" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 mt-12">
            <div className="flex-1 flex flex-col md:self-start">
              <span>{data!.artist.name}</span> 
              <Button variant="stone" className="w-full mt-2">Follow</Button>
            </div>
            <div className="flex-[4]">
              <h3 className="text-sm text-stone-500 mb-4">
                About the <strong>{data!.title}</strong> artwork {data?.collection ? (<span>from <strong>{data?.collection.title}</strong></span>) : null}
              </h3>
              <p> {data!.artist.biography} </p>
            </div>

          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-row gap-4">
            <img src={data!.artist.photo} alt="artist photo" className="bg-gray-300 h-24 w-24" loading="lazy"/>
            <div className="flex-1"> 
              <h3>{data!.artist.name}</h3>
              <span>{data!.artist.origin.country}, {data!.artist.birthday.split('-')[0]}</span>
              <Button size="sm" variant="stone" className="w-full mt-2">Follow</Button>
            </div>
          </div>
          <hr className="my-4 w-full border-gray-400"/>
          <div>
            <h1 className="font-semibold text-xl"> {data!.title} </h1>
            <div className="flex flex-col text-gray-500">
              <span> {data!.year} </span>
              <span> 
                {/* TODO: put dynamic unit based on data provided from backend */}
                {data!.width} x {data!.height} cm
              </span>
              <span>
                Limited edition {data!.editionNumber} of {data!.editionTotal}
              </span>
            </div>
          </div>
          <hr className="my-4 w-full"/>
          <span className="font-semibold text-lg">${data!.price}</span>
          <Button className="w-full mt-4">Buy</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-12">
        <div className="flex-1 flex flex-col md:self-start text-stone-500 font-extralight">
          {artist?.name} Notable Works
        </div>
        <div className="flex-[6] overflow-hidden">
            <swiper-container space-between='60' slides-per-view="auto" navigation scrollbar>
              {
                artist?.artworks.map((artwork) => (
                  <swiper-slide style={{width: '300px', display: 'flex', paddingBottom: '20px'}} key={artwork.Id}>
                    <ArtworkCard artwork={artwork} />
                  </swiper-slide>
                ))
              }
            </swiper-container> 
        </div>
      </div>

      <SimilarArtworks artistId={data?.artist.Id}/>

      <SimilarArtists artistId={data?.artist.Id}/>
    </div>
  )
}

export const ArtworkSkeleton = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="flex-[3]">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 self-end space-y-4">
              <div className="h-4 w-24 bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 animate-pulse" />
            </div>
            <div className="flex-[4]">
              <div className="w-full h-[400px] bg-gray-200 animate-pulse" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 mt-12">
            <div className="flex-1 flex flex-col md:self-start">
              <div className="w-[100px] h-4 bg-gray-200 animate-pulse" />
              <div className="w-[100px] h-4 bg-gray-200 animate-pulse" />
            </div>
            <div className="flex-[4] space-y-4">
              <div className="w-4/5 h-4 bg-gray-200 animate-pulse" />
              <div className="w-3/5 h-4 bg-gray-200 animate-pulse" />
              <div className="w-4/5 h-4 bg-gray-200 animate-pulse" />
              <div className="w-3/5 h-4 bg-gray-200 animate-pulse" />
              <div className="w-full h-4 bg-gray-200 animate-pulse" />
              <div className="w-4/5 h-4 bg-gray-200 animate-pulse" />
            </div>

          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-row gap-4">
            <div className="bg-gray-300 h-24 w-24"></div>
            <div className="flex-1 space-y-4"> 
              <div className="w-[100px] h-4 bg-gray-200 animate-pulse" />
              <div className="w-[100px] h-8 bg-gray-200 animate-pulse" />
            </div>
          </div>
          <hr className="my-4 w-full border-gray-400"/>
          <div className="space-y-4">
            <div className="w-2/3 h-4 bg-gray-200 animate-pulse" />
            <div className="w-2/3 h-4 bg-gray-200 animate-pulse" />
            <div className="w-2/3 h-4 bg-gray-200 animate-pulse" />
          </div>
          <hr className="my-4 w-full"/>
          <div className="w-[100px] h-4 bg-gray-200 animate-pulse mb-4" />
          <div className="w-full h-12 bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

const SimilarArtworks = ({artistId}: {artistId: number | undefined}) => {
  const { data: relatedArtworks, isLoading: relatedArtworksLoading, error: relatedArtworksError } = useGetRelatedArtworks({ artistId: artistId || 0 }, { enabled: !!artistId });

  if (relatedArtworksError) {
    return <Alert variant="danger">{relatedArtworksError}</Alert>
  }

  if (relatedArtworksLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        <div className="flex-1 flex flex-col md:self-start text-stone-500 font-extralight">
          Similar Artworks
        </div>
        <div className="flex-[6] overflow-hidden">
            <swiper-container space-between='60' slides-per-view="auto" navigation scrollbar>
              {
                Array.from({ length: 3 }, (_) => (
                  <swiper-slide style={{width: '300px', display: 'flex', paddingBottom: '20px'}}>
                    <ArtworkCardSkeleton />
                  </swiper-slide>
                ))
              }
            </swiper-container> 
        </div>
      </div>
    )
  }

  return (
    <>
      {relatedArtworks?.results && relatedArtworks.results.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="flex-1 flex flex-col md:self-start text-stone-500 font-extralight">
            Similar Artworks
          </div>
          <div className="flex-[6] overflow-hidden">
              <swiper-container space-between='60' slides-per-view="auto" navigation scrollbar>
                {
                  relatedArtworks?.results?.map((artwork) => (
                    <swiper-slide style={{width: '300px', display: 'flex', paddingBottom: '20px'}} key={artwork.Id}>
                      <ArtworkCard artwork={artwork} />
                    </swiper-slide>
                  ))
                }
              </swiper-container> 
          </div>
        </div>
      ) : null}
    </>
  )

}

const SimilarArtists = ({artistId}: {artistId: number | undefined}) => {
  const { data: similarArtists, isLoading: similarArtistsLoading, error: similarArtistsError } = useGetSimilarArtists({ artistId: artistId || 0 }, { enabled: !!artistId });

  if (similarArtistsError) {
    return <Alert variant="danger">{similarArtistsError}</Alert>
  }

  if (similarArtistsLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        <div className="flex-1 flex flex-col md:self-start text-stone-500 font-extralight">
          Similar Artists
        </div>
        <div className="flex-[6] overflow-hidden">
            <swiper-container space-between='60' slides-per-view="auto" navigation scrollbar>
              {
                Array.from({ length: 3 }, (_) => (
                  <swiper-slide style={{width: '230px', display: 'flex', paddingBottom: '20px'}}>
                    <div className='flex flex-col gap-1 w-full h-full items-center border border-stone-500'>
                      <div className='w-[230px] h-[230px] bg-gray-300 animate-pulse mb-4' />
                      <div className='w-[100px] h-4 bg-gray-200 animate-pulse' />
                      <div className='w-[100px] h-4 bg-gray-200 animate-pulse' />
                      <div className='w-full h-8 bg-gray-200 animate-pulse mt-2' />
                    </div>
                  </swiper-slide>
                ))
              }
            </swiper-container> 
        </div>
      </div>
    )
  }

  return (
    <>
      {similarArtists?.results && similarArtists.results.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="flex-1 flex flex-col md:self-start text-stone-500 font-extralight">
            Similar Artists
          </div>
          <div className="flex-[6] overflow-hidden">
              <swiper-container space-between='60' slides-per-view="auto" navigation scrollbar>
                {
                  similarArtists?.results?.map((artist) => (
                    <swiper-slide style={{width: '230px', display: 'flex', paddingBottom: '20px'}} key={artist.Id}>
                      <div className='flex flex-col gap-1 w-full h-full items-center border border-stone-500'>
                        <img src={artist.photo} alt="" className='w-full h-full object-cover object-center mb-4' height={230} width={230}/>
                        <span className='text-sm font-semibold'>{artist.name}</span>
                        <span className='text-sm'>
                          {artist.origin.country}, {artist.birthday.split('-')[0]}
                        </span>
                        <Button variant='stone' size='sm' className='w-full mt-2'>Follow</Button>
                      </div>
                    </swiper-slide>
                  ))
                }
              </swiper-container> 
          </div>
        </div>
      ) : null}
    </>
  )

}