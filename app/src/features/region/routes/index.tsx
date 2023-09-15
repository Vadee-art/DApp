import { Route, Routes } from 'react-router-dom';
import { Region } from './Region';
import { Regions } from './Regions';

export const RegionRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Regions />} />
      <Route path=":id" element={<Region />} />
    </Routes>
  );
};
