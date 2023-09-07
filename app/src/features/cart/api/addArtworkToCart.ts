import { axios } from "@/lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { Cart } from "../types";
import { useNotificationStore } from "@/stores/notifications";

export type addArtworkToCartParams = {
  artworkId: number;
};

export type addArtworkToCartResponse = Cart;

export const addArtworkToCart = (params: addArtworkToCartParams): Promise<addArtworkToCartResponse> => {
    return axios.post('/cart/', params);
}

export const useAddArtworkToCart = () => {
  const {addNotification} = useNotificationStore();

  return useMutation(addArtworkToCart, {
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'Artwork added to cart',
      });

      queryClient.invalidateQueries('cart');
    },
  });
}
