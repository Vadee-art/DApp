import { Artist } from '@/features/artist/types';
import { Artwork, Genre, Origin, Technique } from '@/features/artwork/types';

export type Homepage = {
  carousels: Artwork[];
  artists: Artist[];
  featuredGenres: Genre[];
  lastArtwork: Artwork;
  talentedArtwork: Artwork;
  techniques: Technique[];
  origins: Origin[];
  selectedArtworks: {
    [key: string]: (Pick<Artwork, 'Id' | 'price' | 'image' | 'title' | 'imageMediumQuality'> & {
      artist: Pick<Artist, 'Id' | 'name' | 'origin'>;
    })[];
  }
};
