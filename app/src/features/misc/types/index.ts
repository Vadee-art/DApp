import { Artist } from '@/features/artist/types';
import { Artwork, Category, Origin, SubCategory } from '@/features/artwork/types';

export type Homepage = {
  carousels: Artwork[];
  artists: Artist[];
  featuredCategories: Category[];
  lastArtwork: Artwork;
  talentedArtwork: Artwork;
  subCategories: SubCategory[];
  origins: Origin[];
  selectedArtworks: {
    [key: string]: (Pick<Artwork, 'Id' | 'price' | 'image' | 'title' | 'imageMediumQuality'> & {
      artist: Pick<Artist, 'Id' | 'name' | 'origin'>;
    })[];
  }
};
