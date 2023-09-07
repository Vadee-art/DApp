import { Route, Routes } from 'react-router-dom';
import { Region } from './Region';

export const RegionRoutes = () => {
  return (
    <Routes>
      <Route path=":id" element={<Region />} />
    </Routes>
  );
};
