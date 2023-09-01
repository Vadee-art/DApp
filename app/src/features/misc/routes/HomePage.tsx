import {register} from 'swiper/element/bundle'
import { Alert } from '@/components/Elements/Alert';
import { useGetHomepage } from '../api/getHomepage';
import { Link } from 'react-router-dom';

register();

export const HomePage = () => {
  const {data, isLoading, error} = useGetHomepage();

  if (error) {
    return (
      <div className='w-full h-[505px] bg-gray-300 flex items-center justify-center'>
        <Alert variant='danger'> {error} </Alert>;
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='animate-pulse'>
        <div className='w-full h-[505px] bg-gray-300' />
        <div className='w-full h-[200px] bg-gray-300 mt-16' />
        <div className='w-full h-[200px] bg-gray-300 container mx-auto mt-16' />
        <div className='w-full h-[75px] bg-gray-300 container mx-auto mt-16' />
        <div className='w-full h-[300px] bg-gray-300 container mx-auto mt-16' />
        <div className='w-full h-[450px] bg-gray-300 container mx-auto mt-16' />
        <div className='w-full h-[75px] bg-gray-300 container mx-auto mt-16' />
      </div>
    )
  }

  return (
    <>
    <swiper-container slides-per-view="1" loop={true} navigation pagination>
      {isLoading ? 
        <div className='w-full h-[505px] bg-gray-300 animate-pulse' /> : 
        data?.carousels.map((artwork) => (
          <swiper-slide>
            <div className='h-[505px]'>
              <div className='absolute top-0 left-0 h-full w-full'>
                <div className='container mx-auto px-4 mt-16 z-10 flex flex-col items-start justify-start text-white [&>span]:leading-tight cursor-default'>
                  {artwork.collection?.title && <span className='text-[21px] font-extralight'> {artwork.collection.title} </span>}
                  <span className='text-[30px] font-normal'> {artwork.artist.name} </span> 
                  <span className='text-[40px] font-normal'> {artwork.category.name} </span>
                </div>
              </div>
              <img src={artwork.image} alt="" className='w-full h-full object-cover object-center' />
            </div>
          </swiper-slide>
        ))
      }
    </swiper-container>
    <div className='bg-stone-400 py-8 mt-16'>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <span className='font-extralight'>
              Photographers
            </span>

          </div>
          <div className='flex-[7] overflow-hidden'>
            <swiper-container space-between='60' slides-per-view="auto" navigation>
              {
                data?.artists.map((artist) => (
                  <swiper-slide style={{width: '150px'}}>
                    <div className='flex flex-col gap-1 w-full h-full'>
                      <div>
                        <img src={artist.photo} alt="" className='w-full h-full object-cover object-center' height={150} width={150}/>
                      </div>
                      <span className='text-sm font-semibold'>{artist.name}</span>
                      <span className='text-sm text-white'>{artist.origin.country}</span> 
                    </div>
                  </swiper-slide>
                ))
              }
            </swiper-container> 
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <span className='font-extralight'>
            Featured Categories
          </span>

        </div>
        <div className='flex-[7] overflow-hidden'>
          <swiper-container space-between='30' slides-per-view="auto" navigation>
            {
              data?.featuredCategories.map((category) => (
                <swiper-slide style={{width: '200px'}}>
                  <div className='flex flex-col gap-1 w-full h-full'>
                    <div className='h-[120px]'>
                      <img src={category.image} alt="" className='w-full h-full object-cover object-center' height={150} width={150}/>
                    </div>
                    <span className='text-center text-lg line-clamp-1'>{category.name}</span>
                  </div>
                </swiper-slide>
              ))
            }
          </swiper-container> 
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 mt-16">
      <div className="flex flex-col md:flex-row gap-8 px-4 py-8 border border-gray-500">
        <div className="flex-1">
          <span className='font-extralight'>
            Start Explore
          </span>
        </div>
        <div className='flex-[7] overflow-hidden'>
          <swiper-container space-between='60' slides-per-view="auto" navigation>
            {
              data?.subCategories.map((subCategory) => (
                <swiper-slide style={{width: '100px'}}>
                  <Link to={'/'} className='border-b border-transparent hover:border-sky-500 hover:text-sky-500 transition-colors duration-150 ease-out'> 
                    {subCategory.name}
                  </Link>
                </swiper-slide>
              ))
            }
          </swiper-container> 
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 mt-16">
      <div className="flex flex-col md:flex-row gap-8 bg-black px-4 pr-16 py-16 text-white">
        <div className="flex-1">
          <span className='font-extralight'>
            Last Artworks
          </span>
        </div>
        <div className='flex-[7] overflow-hidden flex justify-between flex-col md:flex-row gap-8'>
          <div className='flex flex-col justify-between gap-16'>
            <div className="flex flex-col flex-1 gap-4">
              <span className='text-5xl'>
                {data?.lastArtwork.artist.name}
              </span>
              <span>
                {data?.lastArtwork.title}
              </span>
            </div>
            <div>
              <Link to={'/'} className='font-semibold'>Browse Works</Link>
            </div>
          </div>
          <div className='max-w-xs flex items-center'>
            <img src={data?.lastArtwork.imageMediumQuality} alt={data?.lastArtwork.title} />
          </div>
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 mt-16">
      <div className='border border-gray-500 p-8 flex flex-col md:flex-row gap-8 justify-between'>
        <div className='flex-[2] flex flex-col justify-between'>
          <div>
            <h3 className='font-semibold mb-2'>
              Talented Photographer
            </h3>
            <h3 className='text-4xl mb-8'>
              {data?.talentedArtwork.artist.name}
            </h3>
          </div>
          <p className='mb-8'>
            {data?.talentedArtwork.artist.biography}
          </p>
          <Link to={'/'} className='font-semibold'>Browse Works</Link>
        </div>
        <div className='flex-[3]'>
          <img src={data?.talentedArtwork.imageMediumQuality} alt={data?.talentedArtwork.title} className='w-full object-cover object-center' />
        </div>
      </div>
    </div>
    
    <div className="container mx-auto px-4 mt-16">
      <div className="flex flex-col md:flex-row gap-8 px-4 py-8 border border-gray-500">
        <div className="flex-1">
          <span className='font-extralight'>
            Shop by Region
          </span>
        </div>
        <div className='flex-[7] overflow-hidden'>
          <swiper-container space-between='60' slides-per-view="auto" navigation>
            {
              data?.origins.map((origin) => (
                <swiper-slide style={{width: '100px'}}>
                  <Link to={'/'} className='border-b border-transparent hover:border-sky-500 hover:text-sky-500 transition-colors duration-150 ease-out'> 
                    {origin.country}
                  </Link>
                </swiper-slide>
              ))
            }
          </swiper-container> 
        </div>
      </div>
    </div>
    </>
  )
}
