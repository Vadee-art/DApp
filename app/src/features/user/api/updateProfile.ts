import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { User } from '../types';
import { useNotificationStore } from '@/stores/notifications';

export type UpdateProfileParams = {
  id: number;
  data: any;
};

export type UpdateProfileResponse = User;

export const updateProfile = (
  params: UpdateProfileParams
): Promise<UpdateProfileResponse> => {
  return axios.put(`/users/profile/${params.id}/`, params.data);
};

export const useUpdateProfile = () => {
  const { addNotification } = useNotificationStore();

  return useMutation(updateProfile, {
    onSuccess: (data) => {
      addNotification({
        type: 'success',
        title: 'Profile updated',
      });
    },
  });
};
