import { register } from 'swiper/element/bundle';
import { Alert } from '@/components/Elements/Alert';
import { useGetHomepage } from '../api/getHomepage';
import { Link } from 'react-router-dom';
import { ArtworkCard } from '@/features/artwork/components/ArtworkCard';

register();

export const HomePage = () => {
  const { data, isLoading, error } = useGetHomepage();

  if (error) {
    return (
      <div className="flex h-[505px] w-full items-center justify-center bg-gray-300">
        <Alert variant="danger"> {error} </Alert>;
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-[505px] w-full bg-gray-300" />
        <div className="mt-4 h-[200px] w-full bg-gray-300" />
        <div className="container mx-auto mt-4 h-[200px] w-full bg-gray-300" />
        <div className="container mx-auto mt-4 h-[75px] w-full bg-gray-300" />
        <div className="mt-4 h-[300px] w-full bg-gray-300" />
        <div className="container mx-auto mt-4 h-[450px] w-full bg-gray-300" />
        <div className="container mx-auto mt-4 h-[200px] w-full bg-gray-300" />
        <div className="container mx-auto mt-4 h-[75px] w-full bg-gray-300" />
        <div className="container mx-auto mt-4 h-[200px] w-full bg-gray-300" />
      </div>
    );
  }

  const selectedArtworks1 = Object.keys(data?.selectedArtworks || {})[0] ? {
    artworks: data?.selectedArtworks[Object.keys(data?.selectedArtworks || {})[0]],
    categoryName: Object.keys(data?.selectedArtworks || {})[0],
  } : null;
  const selectedArtworks2 = Object.keys(data?.selectedArtworks || {})[1] ? {
    artworks: data?.selectedArtworks[Object.keys(data.selectedArtworks)[1]],
    categoryName: Object.keys(data?.selectedArtworks || {})[1],
  } : null;

  return (
    <>
      <swiper-container slides-per-view="1" loop={true} navigation pagination>
        {isLoading ? (
          <div className="h-[505px] w-full animate-pulse bg-gray-300" />
        ) : (
          data?.carousels.map((artwork) => (
            <swiper-slide>
              <div className="h-[505px]">
                <div className="absolute left-0 top-0 h-full w-full">
                  <div className="container z-10 mx-auto mt-16 flex cursor-default flex-col items-start justify-start px-4 text-white [&>span]:leading-tight">
                    {artwork.collection?.title && (
                      <span className="font-bold text-xl">
                        {' '}
                        {artwork.collection.title}{' '}
                      </span>
                    )}
                    <span className="text-[30px] font-normal"> {artwork.artist.name} </span>
                    {/* <span className="text-[40px] font-normal"> {artwork.genre.name} </span> */}
                  </div>
                </div>
                <img
                  src={artwork.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </swiper-slide>
          ))
        )}
      </swiper-container>
      <div className="mt-4 bg-gray-olive-400 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1">
              <span className="font-bold text-xl text-gray-olive-500">Photographer</span>
            </div>
            <div className="flex-[9] overflow-hidden">
              <swiper-container space-between="20" slides-per-view="auto" navigation>
                {data?.artists.map((artist) => (
                  <swiper-slide style={{ width: '200px' }}>
                    <Link
                      to={`/artists/${artist.Id}`}
                      className="flex h-full w-full flex-col"
                    >
                      <div className='mb-2'>
                        <img
                          src={artist.photo}
                          alt=""
                          className="h-[150px] w-full object-cover object-center"
                          height={150}
                          width={200}
                        />
                      </div>
                      <span className="text-sm">{artist.name}</span>
                      <span className="text-sm text-white font-bold">{artist.origin.country}</span>
                    </Link>
                  </swiper-slide>
                ))}
              </swiper-container>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4 px-4">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <span className="font-bold text-xl text-gray-olive-500">Featured Category</span>
          </div>
          <div className="flex-[9] overflow-hidden">
            <swiper-container space-between="30" slides-per-view="auto" navigation>
              {data?.featuredGenres.map((genre) => (
                <swiper-slide style={{ width: '300px' }}>
                  <Link
                    to={`/artworks?genre=${genre.Id}`}
                    className="flex h-full w-full flex-col gap-1"
                  >
                    <div className="flex h-full w-full flex-col gap-2">
                      <div className="h-[200px]">
                        <img
                          src={genre.image}
                          alt=""
                          className="h-full w-full object-cover object-center"
                          height={200}
                          width={300}
                        />
                      </div>
                      <span className="line-clamp-1 text-sm">{genre.name}</span>
                    </div>
                  </Link>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-4 px-4">
        <div className="flex flex-col gap-8 border border-gray-olive-500 px-2 py-4 md:flex-row">
          <div className="flex-1 flex flex-col text-gray-olive-500">
            <span className="text-xl">Start</span>
            <span className='text-xl font-bold'>Explore</span>
          </div>
          <div className="flex-[9] overflow-hidden">
            <swiper-container space-between="60" slides-per-view="auto" navigation>
              {data?.techniques.map((technique) => (
                <swiper-slide style={{ width: 'auto', display: 'flex', alignItems: 'center' }}>
                  <Link
                    to={`/artworks?technique=${technique.id}`}
                    className="transition-colors duration-150 ease-out hover:text-teal-500 text-xl"
                  >
                    {technique.name}
                  </Link>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      </div>

      <div className='bg-black mt-4 py-6'>
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 text-white md:flex-row">
          <div className="flex-1">
            <span className="text-3xl text-[#00ACEA]">Last Artwork</span>
          </div>
          <div className="flex flex-[9] flex-col justify-between gap-8 overflow-hidden md:flex-row">
            <swiper-container space-between="60" slides-per-view="auto" navigation>
              <swiper-slide style={{ width: '300px' }}>
                  <Link
                    to={`/artists/${data?.lastArtwork.artist.Id}`}
                    className="flex h-full w-full flex-col gap-1"
                  >
                    <div className="flex h-full w-full flex-col">
                      <div className='h-[300px] border border-white mb-2'>
                        <img
                          src={data?.lastArtwork.imageMediumQuality}
                          alt=""
                          className="h-full w-full object-cover object-center"
                          height={300}
                          width={300}
                        />
                      </div>
                      <span className="text-xl font-semibold">{data?.lastArtwork.title}</span>
                      <span className="text-xl text-white font-semibold"><span className='font-normal'>By</span> {data?.lastArtwork.artist.name}</span>
                    </div>
                  </Link>
                </swiper-slide>
            </swiper-container>
            {/* <div className="flex flex-col justify-between gap-16">
              <div className="flex flex-1 flex-col gap-4">
                <span className="text-5xl">{data?.lastArtwork.artist.name}</span>
                <span>{data?.lastArtwork.title}</span>
              </div>
              <div>
                <Link to={`/artists/${data?.lastArtwork.artist.Id}`} className="font-semibold">
                  Browse Works
                </Link>
              </div>
            </div>
            <div className="flex max-w-xs items-center">
              <img src={data?.lastArtwork.imageMediumQuality} alt={data?.lastArtwork.title} />
            </div> */}
          </div>
        </div>
      </div>
      </div>

      <div className="container mx-auto mt-4 px-4">
        <div className="flex flex-col justify-between gap-8 border border-olive-gray-500 p-4 md:flex-row">
          <div className="flex flex-[2] flex-col justify-between">
            <div>
              <h3 className="mb-2 font-semibold text-xl">Talented Photographer</h3>
              <h3 className="mb-8 text-[2.5rem] ml-4 font-bold">{data?.talentedArtwork.artist.name}</h3>
            </div>
            <p className="mb-8 ml-4">{data?.talentedArtwork.artist.biography}</p>
            <Link to={`/artists/${data?.talentedArtwork.artist.Id}`} className="font-semibold">
              Browse Works
            </Link>
          </div>
          <div className="flex-[3]">
            <img
              src={data?.talentedArtwork.imageMediumQuality}
              alt={data?.talentedArtwork.title}
              className="w-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {selectedArtworks1 ? (
        <div className="mt-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-1 mt-8">
                <span className="font-bold text-xl text-gray-olive-500">{selectedArtworks1.categoryName}</span>
              </div>
              <div className="flex-[9] overflow-hidden">
                <swiper-container space-between="30" slides-per-view="auto" navigation>
                  {selectedArtworks1.artworks?.map((artwork) => (
                  <swiper-slide
                    style={{ width: '300px', display: 'flex', paddingBottom: '20px' }}
                    key={artwork.Id}
                  >
                    <ArtworkCard artwork={artwork} />
                  </swiper-slide>
                  ))}
                </swiper-container>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container mx-auto mt-4 px-4">
        <div className="flex flex-col gap-8 border border-gray-olive-500 px-2 py-4 md:flex-row">
          <div className="flex-1 flex flex-col text-gray-olive-500">
            <span className="text-xl">Shop</span>
            <span className='text-xl'>By <span className='font-bold'>Region</span></span>
          </div>
          <div className="flex-[9] overflow-hidden">
            <swiper-container space-between="60" slides-per-view="auto" navigation>
              {data?.origins.map((origin) => (
                <swiper-slide style={{ width: 'auto', display: 'flex', alignItems: 'center' }}>
                  <Link
                    to={`/regions/${origin.Id}`}
                    className="text-xl transition-colors duration-150 ease-out hover:text-teal-500"
                  >
                    {origin.country}
                  </Link>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      </div>

      {selectedArtworks2 ? (
        <div className="mt-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-1 mt-8">
                <span className="font-bold text-xl text-gray-olive-500">{selectedArtworks2?.categoryName}</span>
              </div>
              <div className="flex-[9] overflow-hidden">
                <swiper-container space-between="30" slides-per-view="auto" navigation>
                  {selectedArtworks2.artworks?.map((artwork) => (
                  <swiper-slide
                    style={{ width: '300px', display: 'flex', paddingBottom: '20px' }}
                    key={artwork.Id}
                  >
                    <ArtworkCard artwork={artwork} />
                  </swiper-slide>
                  ))}
                </swiper-container>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
