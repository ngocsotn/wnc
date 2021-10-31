import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));
const Register = lazy(() => import('../pages/Register/Register'));
const Login = lazy(() => import('../pages/Login/Login'));
const Logout = lazy(() => import('../pages/Logout/Logout'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword/ForgotPassword'));
const Detail = lazy(() => import('../pages/Detail/Detail'));
const Manager = lazy(() => import('../pages/AUTH/Manager/Manager'));
const CategoryManager = lazy(() => import('../pages/AUTH/ADMIN/CategoryManager/CategoryManager'));
const UserManager = lazy(() => import('../pages/AUTH/ADMIN/UserManager/UserManager'));
const ProductManager = lazy(() => import('../pages/AUTH/ADMIN/ProductManager/ProductManager'));

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
  {
    path: '/detail/:id',
    protected: false,
    exact: true,
    component: Detail,
  },

  {
    path: '/account/:slug',
    protected: false,
    exact: true,
    component: Manager,
  },
  {
    path: '/account',
    protected: false,
    component: Manager,
  },
  {
    path: '/admin/user-manager',
    protected: false,
    component: UserManager,
    roles: ['admin'],
  },
  {
    path: '/admin/product-manager',
    protected: false,
    component: ProductManager,
    roles: ['admin'],
  },
  {
    path: '/admin/category-manager',
    protected: false,
    component: CategoryManager,
    roles: ['admin'],
  },
];
