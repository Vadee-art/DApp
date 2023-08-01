import { useRoutes } from 'react-router-dom';
import { useUser } from '@/lib/auth';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { MainLayout } from '@/components/Layout';
import { HomePage } from '@/features/misc/routes/HomePage';

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
  ];

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  return <>{element}</>;
};
