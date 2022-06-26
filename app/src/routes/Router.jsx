import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layout/loadable/Loadable';
import FullLayout from '../layout/full-layout/FullLayout';
import BlankLayout from '../layout/plain-layout/PlainLayout';

const Error = Loadable(lazy(() => import('../components/Error')));

const Main = Loadable(lazy(() => import('../pages/main')));
const Artwork = Loadable(lazy(() => import('../pages/artwork')));
const ArtworkList = Loadable(lazy(() => import('../pages/artworkList')));
const Artist = Loadable(lazy(() => import('../pages/artist')));
const ArtistList = Loadable(lazy(() => import('../pages/artistList')));
const RegionList = Loadable(lazy(() => import('../pages/regionList')));
const Region = Loadable(lazy(() => import('../pages/region')));
const UserProfile = Loadable(lazy(() => import('../pages/userProfile')));
const Cart = Loadable(lazy(() => import('../pages/cart')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/main" /> },
      { path: '/main', element: <Main /> },
      { path: '/artworks/', element: <ArtworkList /> },
      { path: '/artworks/:workId', element: <Artwork /> },
      { path: '/artists/search', element: <ArtistList /> },
      { path: '/artists/:artistId', element: <Artist /> },
      { path: '/regions/', element: <RegionList /> },
      { path: '/regions/:country', element: <Region /> },
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
