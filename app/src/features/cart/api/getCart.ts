import { axios } from "@/lib/axios";
import { useQuery } from "react-query";
import { Cart } from "../types";

export type GetCartResponse = Cart;

export const getCart = (): Promise<GetCartResponse> => {
    return axios.get('/cart/');
}

export const useGetCart = () => {
  return useQuery(['cart'], getCart);
}
