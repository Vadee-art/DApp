import { Route, Routes } from 'react-router-dom';
import { Artworks } from './Artworks';
import { Artwork } from './Artwork';

export const ArtworkRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Artworks />} />
      <Route path=":id" element={<Artwork />} />
    </Routes>
  );
};
