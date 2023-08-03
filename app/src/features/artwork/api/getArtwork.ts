import { axiosWithoutAuth } from "@/lib/axios"
import { useQuery } from "react-query";
import { Artwork } from "../types";

export type getArtworkParams = {
  id: number;
};

export type getArtworkResponse = Artwork; 

export const getArtwork = ({ id } : getArtworkParams) : Promise<getArtworkResponse> => {
  return axiosWithoutAuth.get('/artworks/' + id);
}

export const useGetArtwork = (params: getArtworkParams) => {
  return useQuery<getArtworkResponse, string>(['artwork', params], () => getArtwork(params));
}