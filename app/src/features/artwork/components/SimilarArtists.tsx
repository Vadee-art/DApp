import { Button } from "@/components/Elements";
import { Alert } from "@/components/Elements/Alert";
import { useGetSimilarArtists } from "@/features/artist/api/getSimilarArtists";
import { useHandleFollowingArtist } from "@/features/artist/hooks/useHandleFollowingArtist";
import { Artist } from "@/features/artist/types";

export const SimilarArtists = ({ artistId }: { artistId: number | undefined }) => {
  const {
    data: similarArtists,
    isLoading: similarArtistsLoading,
    error: similarArtistsError,
  } = useGetSimilarArtists({ artistId: artistId || 0 }, { enabled: !!artistId });

  if (similarArtistsError) {
    return <Alert variant="danger">{similarArtistsError}</Alert>;
  }

  if (similarArtistsLoading) {
    return (
      <div className="mt-12 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-1 flex-col font-extralight text-gray-olive-500 md:self-start">
          Similar Artists
        </div>
        <div className="flex-[6] overflow-hidden">
          <swiper-container space-between="60" slides-per-view="auto" navigation scrollbar>
            {Array.from({ length: 3 }, (_) => (
              <swiper-slide style={{ width: '230px', display: 'flex', paddingBottom: '20px' }}>
                <div className="flex h-full w-full animate-pulse flex-col items-center gap-1 border border-gray-olive-500">
                  <div className="mb-4 h-[230px] w-[230px] bg-gray-300" />
                  <div className="h-4 w-[100px] bg-gray-200" />
                  <div className="h-4 w-[100px] bg-gray-200" />
                  <div className="mt-2 h-8 w-full bg-gray-200" />
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </div>
    );
  }

  return (
    <>
      {similarArtists?.results && similarArtists.results.length > 0 ? (
        <div className="mt-12 flex flex-col gap-8 md:flex-row">
          <div className="flex flex-1 flex-col font-extralight text-gray-olive-500 md:self-start">
            Similar Artists
          </div>
          <div className="flex-[6] overflow-hidden">
            <swiper-container space-between="60" slides-per-view="auto" navigation scrollbar>
              {similarArtists?.results?.map((artist) => (
                <swiper-slide
                  style={{ width: '230px', display: 'flex', paddingBottom: '20px' }}
                  key={artist.Id}
                >
                  <SimilarArtistCard artist={artist} />
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      ) : null}
    </>
  );
};

type SimilarArtistCardProps = {
  artist: Artist;
}

const SimilarArtistCard = ({artist}: SimilarArtistCardProps) => {
  const { handleFollow, followLoading, unfollowLoading } = useHandleFollowingArtist(artist.Id);

  return (
    <div className="flex h-full w-full flex-col items-center gap-1 border border-gray-olive-500">
      <img
        src={artist.photo}
        alt=""
        className="mb-4 h-full w-full object-cover object-center"
        height={230}
        width={230}
      />
      <span className="text-sm font-semibold">{artist.name}</span>
      <span className="text-sm">
        {artist.origin.country}, {artist.birthday.split('-')[0]}
      </span>
      <Button variant="gray-olive" size="sm" className="mt-2 w-full" onClick={() => handleFollow(artist.isFollowing)} isLoading={followLoading || unfollowLoading}>
        {artist.isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  )

}