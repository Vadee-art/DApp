import { axios } from "@/lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";
import { Cart } from "../types";

export type addArtworkToCartParams = {
  artworkId: number;
};

export type addArtworkToCartResponse = Cart;

export const addArtworkToCart = (params: addArtworkToCartParams): Promise<addArtworkToCartResponse> => {
    return axios.post('/cart/', params);
}

export const useAddArtworkToCart = () => {
  return useMutation(addArtworkToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart');
    },
  });
}
