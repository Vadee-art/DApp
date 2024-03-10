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
        <div className="mt-8 h-[200px] w-full bg-gray-300" />
        <div className="container mx-auto mt-8 h-[200px] w-full bg-gray-300" />
        <div className="container mx-auto mt-8 h-[75px] w-full bg-gray-300" />
        <div className="container mx-auto mt-8 h-[300px] w-full bg-gray-300" />
        <div className="container mx-auto mt-8 h-[450px] w-full bg-gray-300" />
        <div className="container mx-auto mt-8 h-[75px] w-full bg-gray-300" />
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
                  <div className="container z-10 mx-auto mt-8 flex cursor-default flex-col items-start justify-start px-4 text-white [&>span]:leading-tight">
                    {artwork.collection?.title && (
                      <span className="text-[21px] font-extralight">
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
      <div className="mt-8 bg-gray-olive-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1">
              <span className="text-lg">Photographers</span>
            </div>
            <div className="flex-[7] overflow-hidden">
              <swiper-container space-between="28" slides-per-view="auto" navigation>
                {data?.artists.map((artist) => (
                  <swiper-slide style={{ width: '130px' }}>
                    <Link
                      to={`/artists/${artist.Id}`}
                      className="flex h-full w-full flex-col gap-1"
                    >
                      <div>
                        <img
                          src={artist.photo}
                          alt=""
                          className="h-full w-full object-cover object-center"
                          height={150}
                          width={150}
                        />
                      </div>
                      <span className="text-sm font-semibold">{artist.name}</span>
                      <span className="text-sm text-white">{artist.origin.country}</span>
                    </Link>
                  </swiper-slide>
                ))}
              </swiper-container>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <span className="text-lg text-gray-olive-500">Featured Categories</span>
          </div>
          <div className="flex-[7] overflow-hidden">
            <swiper-container space-between="28" slides-per-view="auto" navigation>
              {data?.featuredGenres.map((genre) => (
                <swiper-slide style={{ width: '209px' }}>
                  <Link
                    to={`/artworks?genre=${genre.Id}`}
                    className="flex h-full w-full flex-col gap-1"
                  >
                    <div className="flex h-full w-full flex-col gap-1">
                      <div className="h-[125px]">
                        <img
                          src={genre.image}
                          alt=""
                          className="h-full w-full object-cover object-center"
                          height={150}
                          width={150}
                        />
                      </div>
                      <span className="line-clamp-1 text-lg">{genre.name}</span>
                    </div>
                  </Link>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col gap-8 border border-gray-500 p-6 md:flex-row items-center">
          <div className="flex-1">
            <span className="text-lg text-gray-olive-500">Start Explore</span>
          </div>
          <div className="flex-[7] overflow-hidden">
            <swiper-container space-between="60" slides-per-view="auto" navigation>
              {data?.techniques.map((technique) => (
                <swiper-slide style={{ width: 'auto' }}>
                  <Link
                    to={`/artworks?technique=${technique.id}`}
                    className="border-b border-transparent transition-colors duration-150 ease-out hover:border-teal-500 hover:text-teal-500 whitespace-nowrap text-lg"
                  >
                    {technique.name}
                  </Link>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col gap-8 bg-black p-8 text-white md:flex-row">
          <div className="flex-1">
            <span className="text-lg">Last Artworks</span>
          </div>
          <div className="flex flex-[7] flex-col justify-between gap-8 overflow-hidden md:flex-row">
            <div className="flex flex-col justify-between gap-16">
              <div className="flex flex-1 flex-col gap-4">
                <span className="text-5xl">{data?.lastArtwork.artist.name}</span>
                <span className='font-medium'>{data?.lastArtwork.title}</span>
              </div>
              <div>
                <Link to={`/artists/${data?.lastArtwork.artist.Id}`} className="font-semibold">
                  Browse Works
                </Link>
              </div>
            </div>
            <div className="flex max-w-sm items-center">
              <img src={data?.lastArtwork.imageMediumQuality} alt={data?.lastArtwork.title} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col justify-between gap-8 border border-gray-500 p-8 md:flex-row">
          <div className="flex flex-[2] flex-col justify-between">
            <div>
              <h3 className="mb-6 font-medium">Talented Photographer</h3>
              <h3 className="mb-6 text-4xl">{data?.talentedArtwork.artist.name}</h3>
            </div>
            <p className="mb-8">{data?.talentedArtwork.artist.biography}</p>
            <Link to={`/artists/${data?.talentedArtwork.artist.Id}`} className="font-medium text-teal-500">
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
        <div className="mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-1">
                <span className="text-lg text-gray-olive-500">{selectedArtworks1.categoryName}</span>
              </div>
              <div className="flex-[7] overflow-hidden">
                <swiper-container space-between="28" slides-per-view="auto" navigation>
                  {selectedArtworks1.artworks?.map((artwork) => (
                  <swiper-slide
                    style={{ width: '230px', display: 'flex', paddingBottom: '20px' }}
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

      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col gap-8 border border-gray-500 p-6 md:flex-row items-center">
          <div className="flex-1">
            <span className="text-lg text-gray-olive-500">Shop by Region</span>
          </div>
          <div className="flex-[7] overflow-hidden">
            <swiper-container space-between="60" slides-per-view="auto" navigation>
              {data?.origins.map((origin) => (
                <swiper-slide style={{ width: 'auto' }}>
                  <Link
                    to={`/regions/${origin.Id}`}
                    className="border-b border-transparent transition-colors duration-150 ease-out hover:border-teal-500 hover:text-teal-500 whitespace-nowrap text-lg"
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
        <div className="mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-1">
                <span className="text-lg text-gray-olive-500">{selectedArtworks2?.categoryName}</span>
              </div>
              <div className="flex-[7] overflow-hidden">
                <swiper-container space-between="28" slides-per-view="auto" navigation>
                  {selectedArtworks2.artworks?.map((artwork) => (
                  <swiper-slide
                    style={{ width: '230px', display: 'flex', paddingBottom: '20px' }}
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
