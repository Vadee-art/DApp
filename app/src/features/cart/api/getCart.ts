import { axios } from "@/lib/axios";
import { useMutation } from "react-query";
import { Cart } from "../types";

export type GetCartResponse = Cart;

export const getCart = (): Promise<GetCartResponse> => {
    return axios.get('/cart/');
}

export const useGetCart = () => {
  return useMutation(getCart);
}
