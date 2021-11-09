import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));
const Register = lazy(() => import('../pages/Register/Register'));
const VerifyEmail = lazy(() => import('../pages/VerifyEmail/VerifyEmail'));
const Login = lazy(() => import('../pages/Login/Login'));
const Logout = lazy(() => import('../pages/Logout/Logout'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword/ResetPassword'));
const Detail = lazy(() => import('../pages/Detail/Detail'));
const Manager = lazy(() => import('../pages/AUTH/Manager/Manager'));
const CategoryManager = lazy(() => import('../pages/AUTH/ADMIN/CategoryManager/CategoryManager'));
const SubCategoryManager = lazy(() =>
  import('../pages/AUTH/ADMIN/SubCategoryManager/SubCategoryManager')
);
const RequestManager = lazy(() => import('../pages/AUTH/ADMIN/RequestManager/RequestManager'));
const UserManager = lazy(() => import('../pages/AUTH/ADMIN/UserManager/UserManager'));
const ProductManager = lazy(() => import('../pages/AUTH/ADMIN/ProductManager/ProductManager'));
const Search = lazy(() => import('../pages/Search/Search'));

export const routes = [
  {
    path: '/',
    protected: false,
    exact: true,
    component: Home,
    roles: [],
  },
  {
    path: '/register',
    protected: false,
    exact: true,
    component: Register,
    roles: [],
  },
  {
    path: '/login',
    protected: false,
    exact: true,
    component: Login,
    roles: [],
  },
  {
    path: '/logout',
    protected: false,
    exact: true,
    component: Logout,
    roles: [],
  },
  {
    path: '/forgot-password',
    protected: false,
    exact: true,
    component: ForgotPassword,
    roles: [],
  },
  {
    path: '/reset-password',
    protected: false,
    exact: true,
    component: ResetPassword,
    roles: [],
  },
  {
    path: '/confirm-email',
    protected: false,
    exact: true,
    component: VerifyEmail,
    roles: [],
  },
  {
    path: '/detail/:id',
    protected: false,
    exact: true,
    component: Detail,
    roles: [],
  },

  {
    path: '/account/:slug',
    protected: true,
    exact: true,
    component: Manager,
    roles: [],
  },
  {
    path: '/account',
    protected: true,
    component: Manager,
    roles: [],
  },
  {
    path: '/account/product-manager',
    protected: true,
    component: Manager, //will be edited
    roles: ['seller'],
  },
  {
    path: '/admin/user-manager',
    protected: true,
    component: UserManager,
    roles: ['admin'],
  },
  {
    path: '/admin/product-manager',
    protected: true,
    component: ProductManager,
    roles: ['admin'],
  },
  {
    path: '/admin/category-manager',
    protected: true,
    component: CategoryManager,
    roles: ['admin'],
  },
  {
    path: '/admin/subcategory-manager',
    protected: true,
    component: SubCategoryManager,
    roles: ['admin'],
  },
  {
    path: '/admin/request-promotion',
    protected: true,
    component: RequestManager,
    roles: ['admin'],
  },
  {
    path: '/search',
    protected: false,
    component: Search,
    roles: [],
  },
];
