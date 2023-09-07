import { axios } from "@/lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { Cart } from "../types";
import { useNotificationStore } from "@/stores/notifications";

export type AddArtworkToCartParams = {
  artworkId: number;
};

export type AddArtworkToCartResponse = Cart;

export const addArtworkToCart = (params: AddArtworkToCartParams): Promise<AddArtworkToCartResponse> => {
    return axios.post('/cart/', params);
}

export const useAddArtworkToCart = () => {
  const {addNotification} = useNotificationStore();

  return useMutation(addArtworkToCart, {
    onSuccess: (data) => {
      addNotification({
        type: 'success',
        title: 'Artwork added to cart',
      });

      queryClient.setQueryData(['cart'], data);
    },
  });
}
