import { MainLayout } from "@/components/Layout";

export const protectedRoutes = [
  {
    path: '/user/*',
    element: (
      <MainLayout>
        <h1>User Dashboard</h1>
      </MainLayout>
    ),
  },
];
