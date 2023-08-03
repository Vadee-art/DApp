import { Route, Routes } from 'react-router-dom';
import { Artworks } from './Artworks';

export const ArtworkRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Artworks />} />
    </Routes>
  );
};
