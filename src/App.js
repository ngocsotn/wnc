import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { routes } from './configs/routes';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Suspense, useEffect } from 'react';
import Loading from './components/Loading/Loading';
import Header from './components/Layouts/Header/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  // return <div className="App">Web đấu giá</div>;
  return (
    // <ThemeProvider theme={theme}>
    //   <ToastContainer />
    //   <CssBaseline />
    //   <Header />
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
                    // <ProtectedRoute {...props} currentPath={route.path}>
                    //   <route.component />
                    // </ProtectedRoute>
                    <div className="App">Web đấu giá</div>
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
    //   <Footer />
    // </ThemeProvider>
  );
}

export default App;
