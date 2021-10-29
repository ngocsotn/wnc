import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));
const Register = lazy(() => import('../pages/Register/Register'));
const Login = lazy(() => import('../pages/Login/Login'));

export const routes = [
  {
    path: '/',
    protected: false,
    exact: true,
    component: Home,
  },
  {
    path: '/register',
    protected: false,
    exact: true,
    component: Register,
  },
  {
    path: '/login',
    protected: false,
    exact: true,
    component: Login,
  },
];
