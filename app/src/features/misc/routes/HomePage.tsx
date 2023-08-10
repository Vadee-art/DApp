import {register} from 'swiper/element/bundle'
import { useGetArtworkCarousel } from '@/features/artwork/api/getArtworksCarousel';
import { API_URL_NO_POSTFIX } from '@/config';
import { Alert } from '@/components/Elements/Alert';

register();

export const HomePage = () => {
  return (
    <>
    <HeaderCarousel />
    </>
  )
}

const HeaderCarousel = () => {
  const {data, isLoading, error} = useGetArtworkCarousel();

  if (error) {
    return (
      <div className='w-full h-[505px] bg-gray-300 flex items-center justify-center'>
        <Alert variant='danger'> {error} </Alert>;
      </div>
    )
  }

  console.log(data?.results);
  return (
    <swiper-container slides-per-view="1" loop={true} navigation pagination>
      {isLoading ? 
        <div className='w-full h-[505px] bg-gray-300 animate-pulse' /> : 
        data?.results.map((artwork) => (
          <swiper-slide>
            <div className='h-[505px]'>
              <div className='absolute top-[15%] left-[15%] z-10 flex flex-col items-start justify-start text-white [&>span]:leading-tight cursor-default'>
                {artwork.collection.title && <span className='text-[21px] font-extralight'> {artwork.collection.title} </span>}
                <span className='text-[30px] font-normal'> {artwork.artist.name} </span> 
                <span className='text-[40px] font-normal'> {artwork.category.name} </span>
              </div>
              <img src={artwork.image} alt="" className='w-full h-full object-cover object-center' />
            </div>
          </swiper-slide>
        ))
      }
    </swiper-container>
  )

}