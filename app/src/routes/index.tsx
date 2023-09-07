import { useRoutes } from 'react-router-dom';
import { useUser } from '@/lib/auth';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';
import { RegionRoutes } from '@/features/region/routes';
import { ScrollToTop } from '@/components/Layout/ScrollToTop';

const { ArtworkRoutes } = lazyImport(() => import('@/features/artwork/routes'), 'ArtworkRoutes');
const { ArtistRoutes } = lazyImport(() => import('@/features/artist/routes'), 'ArtistRoutes');
const { HomePage } = lazyImport(() => import('@/features/misc/routes/HomePage'), 'HomePage');

export const AppRoutes = () => {
  const { data: user } = useUser({ suspense: true });

  const commonRoutes = [
    {
      path: '*',
      element: <div>Not Found</div>,
    },
    {
      path: '/',
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    {
      path: '/artworks/*',
      element: (
        <MainLayout>
          <ArtworkRoutes />
        </MainLayout>
      ),
    },
    {
      path: '/artists/*',
      element: (
        <MainLayout>
          <ArtistRoutes />
        </MainLayout>
      ),
    },
    {
      path: '/regions/*',
      element: (
        <MainLayout>
          <RegionRoutes />
        </MainLayout>
      ),
    },
  ];

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  return (
    <>
      <ScrollToTop />
      {element}
    </>
  );
};
