import { Route, Routes } from 'react-router-dom';
import { Artists } from './Artists';
import { Artist } from './Artist';

export const ArtistRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Artists />} />
      <Route path=":id" element={<Artist />} />
    </Routes>
  );
};
