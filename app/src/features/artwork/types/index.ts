import { Artist } from '@/features/artist/types';

export type Artwork = {
  Id: number;
  collection: {
    title: string;
  } | null;
  tags: string[];
  genre: Genre;
  technique: Technique;
  voucher: {
    title: string;
    artworkId: number | null;
    editionNumber: string;
    edition: string;
    priceWei: string;
    priceDollar: string;
    token_Uri: string;
    content: string;
    signature: string;
  };
  title: string;
  subtitle: string | null;
  slug: string;
  year: string;
  print: string | null;
  condition: string | null;
  image: string;
  imageMediumQuality: string;
  width: string;
  height: string;
  depth: number;
  unit: string;
  frame: string | null;
  aboutWork: string;
  editionNumber: number;
  editionTotal: number;
  price: number;
  isMinted: boolean;
  onMarket: boolean;
  isArtistTalented: boolean;
  isActive: boolean;
  isSoldOut: boolean;
  isNotable: boolean;
  isCarousel: boolean;
  createdAt: string;
  owner: string | null;
  artist: Artist;
  createdBy: number;
};

export type Genre = {
  Id: number;
  name: string;
  slug: string;
  createdAt: string;
  isFeatured: boolean;
  image: string;
};

export type Technique = {
  Id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  genre: number;
};

export type Origin = {
  Id: number;
  country: string;
  city: string;
  description: string;
  flag: string;
};
