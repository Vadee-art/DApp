import { axios } from "@/lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { Cart } from "../types";
import { useNotificationStore } from "@/stores/notifications";

export type DeleteArtworkFromCartParams = {
  artworkId: number;
};

export type DeleteArtworkFromCartResponse = Cart;

export const deleteArtworkFromCart = (params: DeleteArtworkFromCartParams): Promise<DeleteArtworkFromCartResponse> => {
    return axios.delete('/cart/', {data: params});
}

export const useDeleteArtworkFromCart = () => {
  const {addNotification} = useNotificationStore();

  return useMutation(deleteArtworkFromCart, {
    onSuccess: (data) => {
      addNotification({
        type: 'success',
        title: 'Artwork removed from cart',
      });

      queryClient.setQueryData(['cart'], data);
    },
  });
}
