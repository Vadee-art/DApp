import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { User } from '../types';
import { useNotificationStore } from '@/stores/notifications';
import { queryClient } from '@/lib/react-query';

export type UpdateProfileParams = {
  id: number;
  data: {
    address: string;
    country: number;
    province: number;
    city: number;
    postalCode: string;
    phoneNumber: string;
    email: string;
  };
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
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Profile updated',
      });
      queryClient.invalidateQueries(['profile'])
    },
  });
};
