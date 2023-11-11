import { useFollowArtist } from "../api/followArtist";
import { useUnfollowArtist } from "../api/unfollowArtist";

export const useHandleFollowingArtist = (artistId: number) => {
  const { mutateAsync: followArtist, isLoading: followLoading } = useFollowArtist();
  const { mutateAsync: unfollowArtist, isLoading: unfollowLoading } = useUnfollowArtist();

  const handleFollow = async (isFollowing: boolean) => {
    if (artistId) {
      if (isFollowing) {
        await unfollowArtist({ artistId })
      } else {
        await followArtist({ artistId })
      }
    }
  }

  return {
    handleFollow,
    followLoading,
    unfollowLoading,
  }
}