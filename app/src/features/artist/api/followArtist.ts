import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useNotificationStore } from '@/stores/notifications';

export type FollowArtistParams = {
  artistId: number;
};

export type FollowArtistResponse = null;

export const followArtist = (
  params: FollowArtistParams
): Promise<FollowArtistResponse> => {
  return axios.post(`/artists/${params.artistId}/follow`);
};

export const useFollowArtist = () => {
  const { addNotification } = useNotificationStore();

  return useMutation(followArtist, {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Followed artist',
      });
    },
  });
};
