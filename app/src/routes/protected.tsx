import { MainLayout } from '@/components/Layout';
import { ProfileLayout } from '@/features/user/components/ProfileLayout';
import { lazyImport } from '@/utils/lazyImport';

const { UserRoutes } = lazyImport(() => import('@/features/user/routes'), 'UserRoutes');
const { ProfileRoutes } = lazyImport(() => import('@/features/user/routes'), 'ProfileRoutes');
const { CartRoutes } = lazyImport(() => import('@/features/cart/routes'), 'CartRoutes');

export const protectedRoutes = [
  {
    path: '/profile/*',
    element: (
      <ProfileLayout>
        <ProfileRoutes />
      </ProfileLayout>
    ),
  },
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
