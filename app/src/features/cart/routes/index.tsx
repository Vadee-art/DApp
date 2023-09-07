import { Route, Routes } from 'react-router-dom';
import { Shipping } from './Shipping';

export const CartRoutes = () => {
  return (
    <Routes>
      <Route path="/shipping" element={<Shipping />} />
    </Routes>
  );
};
