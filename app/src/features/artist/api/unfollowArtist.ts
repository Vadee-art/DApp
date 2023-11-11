import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useNotificationStore } from '@/stores/notifications';

export type UnfollowArtistParams = {
  artistId: number;
};

export type UnfollowArtistResponse = null;

export const unfollowArtist = (
  params: UnfollowArtistParams
): Promise<UnfollowArtistResponse> => {
  return axios.post(`/artists/${params.artistId}/unfollow`);
};

export const useUnfollowArtist = () => {
  const { addNotification } = useNotificationStore();

  return useMutation(unfollowArtist, {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Followed artist',
      });
    },
  });
};
