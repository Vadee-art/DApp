import { Route, Routes } from 'react-router-dom';
import { Artists } from './Artists';

export const ArtistRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Artists />} />
    </Routes>
  );
};
