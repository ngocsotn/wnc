import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { routes } from './configs/routes';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Suspense, useEffect } from 'react';
import Loading from './components/Loading/Loading';
import Header from './components/Layouts/Header/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import aos from 'aos';
import 'aos/dist/aos.css';
import CustomModal from './components/CustomModal/CustomModal';
import ProtectedRoute from './components/Common/ProtectedRoute/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './slices/auth.slice';
const theme = createTheme({
  palette: {
    primary: {
      main: '#E30812',
      contrastText: '#fff',
    },
    secondary: {
      main: '#131722',
      contrastText: '#fff',
    },
  },
});
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const user = useSelector(state => state.auth.user)
  useEffect(() => {
    aos.init({
      offset: 150,
    });
    aos.refresh();

    const token = localStorage.getItem('token');
    const refresh_token = localStorage.getItem('refresh_token');
    if (token && refresh_token) {
      dispatch(
        authActions.verifiedAuth({
          token,
          refresh_token,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.active === false && !location.pathname.includes('/confirm-email') && !location.pathname.includes("/logout")) {
      return history.push('/confirm-email');
    }
  }, [user, history, location.pathname]);

  return (
    // <ThemeProvider theme={theme}>
    //   <ToastContainer />
    //   <CssBaseline />
    //   <Header />
    <>
      <CustomModal />

      <Suspense fallback={<Loading />}>
        <Header />
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  if (route.protected) {
                    return (
                      <ProtectedRoute {...props} currentPath={route.path} roles={route.roles}>
                        <route.component />
                      </ProtectedRoute>
                    );
                  }
                  return <route.component {...route.props} />;
                }}
              />
            );
          })}
          <Route path="*">404 NOT FOUND</Route>
        </Switch>
      </Suspense>
    </>
    //   <Footer />
    // </ThemeProvider>
  );
}

export default App;
