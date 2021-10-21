import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));

export const routes = [
  {
    path: '/',
    protected: false,
    exact: true,
    component: Home,
  },
];
