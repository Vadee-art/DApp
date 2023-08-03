export type Artwork = {
  Id: number;
  collection: {
    title: string;
  };
  artistId: number;
  tags: string[];
  category: {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    isFeatured: boolean;
    image: string;
  };
  subCategory: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    category: number;
  };
  origin: {
    id: number;
    country: string;
    city: string;
    description: string;
    flag: string;
  };
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
  artist: number;
  createdBy: number;
}