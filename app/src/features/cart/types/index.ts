import { Artwork } from "@/features/artwork/types"

export type Cart = {
  artworks: Artwork[];
  created: string;
  id: number;
  isRemoved: boolean;
  modified: string;
  user: number;
};
