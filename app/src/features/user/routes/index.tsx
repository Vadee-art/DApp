import { Route, Routes } from 'react-router-dom';
import { Profile } from './Profile';

export const UserRoutes = () => {
  return (null);
};


export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/info" element={<Profile />} />
    </Routes>
  );
};