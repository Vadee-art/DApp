import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

const router = createBrowserRouter([
  {
    path: '*',
    element: <AppRoutes />,
  },
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
