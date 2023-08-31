import { Origin } from "@/features/artwork/types";

export type Artist = {
  Id: number;
  name: string;
  username: string;
  walletAddress: string;
  galleryAddress: string;
  photo: string;
  birthday: string;
  biography: string;
  cv: string;
  user: number;
  origin: Origin;
  achievements: string[];
  favorites: number[];
};
