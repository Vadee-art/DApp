import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layout/full-layout/loadable/Loadable';
import Header from '../components/nav/Header';
import FullLayout from '../layout/full-layout/FullLayout';
import BlankLayout from '../layout/plain-layout/PlainLayout';

const Error = Loadable(lazy(() => import('../pages/Error')));

const Main = Loadable(lazy(() => import('../pages/Main')));
const Artwork = Loadable(lazy(() => import('../pages/Artwork')));
const ArtworkList = Loadable(lazy(() => import('../pages/ArtworkList')));
const Artist = Loadable(lazy(() => import('../pages/Artist')));
const ArtistList = Loadable(lazy(() => import('../pages/ArtistList')));
const Regions = Loadable(lazy(() => import('../pages/Regions')));
const UserProfile = Loadable(lazy(() => import('../pages/UserProfile')));
const Cart = Loadable(lazy(() => import('../pages/Cart')));

const Router = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <FullLayout />
      </>
    ),
    children: [
      { path: '/', element: <Navigate to="/main" /> },
      { path: '/main', element: <Main /> },
      { path: '/artworks/:workId', element: <Artwork /> },
      { path: '/artworks/', element: <ArtworkList /> },
      { path: '/artists/:artistId', element: <Artist /> },
      { path: '/artists/', element: <ArtistList /> },
      { path: '/regions/', element: <Regions /> },
      { path: '/users/profile', element: <UserProfile /> },
      { path: '/cart/shippingAddress/:workId?', element: <Cart /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: 'auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;

/* <Route path="/cart/placeOrder/:workId?" component={Cart} />
  <Route path="/orders/:orderId" component={Cart} />
  <Route exact path="/login" component={EnterForm} />
  <Route exact path="/register" component={RegisterForm} />
  <Route path="/admin-panel/user/:userId/edit" component={UserEdit} />
  <Route exact path="/admin-panel/:route" component={AdminPanel} /> */
