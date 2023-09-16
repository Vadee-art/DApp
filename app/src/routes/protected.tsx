import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { UserRoutes } = lazyImport(() => import('@/features/user/routes'), 'UserRoutes');
const { CartRoutes } = lazyImport(() => import('@/features/cart/routes'), 'CartRoutes');

export const protectedRoutes = [
  {
    path: '/user/*',
    element: (
      <MainLayout>
        <UserRoutes />
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
