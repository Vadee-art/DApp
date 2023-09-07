import { MainLayout } from '@/components/Layout';
import { CartRoutes } from '@/features/cart/routes';

export const protectedRoutes = [
  {
    path: '/user/*',
    element: (
      <MainLayout>
        <h1>User Dashboard</h1>
      </MainLayout>
    ),
  },
  {
    path: '/cart/*',
    element: (
      <MainLayout showNav={false}>
        <CartRoutes />
      </MainLayout>
    ),
  },
];
