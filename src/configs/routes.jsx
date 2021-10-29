import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));
const Register = lazy(() => import('../pages/Register/Register'));
const Login = lazy(() => import('../pages/Login/Login'));
const Logout = lazy(() => import('../pages/Logout/Logout'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword/ForgotPassword'));

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
  {
    path: '/logout',
    protected: false,
    exact: true,
    component: Logout,
  },
  {
    path: '/forgot-password',
    protected: false,
    exact: true,
    component: ForgotPassword,
  },
];
