import React from 'react';
import { observer } from 'mobx-react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
  matchPath,
} from 'react-router-dom';
import { useStore } from '../stores/createStore';
import Home from './Home/Home';
import Auth from './Auth/Auth';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  restore: '/auth/restore',
  account: '/account',
  product: '/product/:id',
  addProduct: '/sell',
  profile: '/user/:id',
  saved: '/saved',
  search: '/search',
};

export const ProtectedRoute = observer(
  ({
    redirectTo = '/',
    forAuthorized = true,
    component: Component,
    ...rest
  }) => {
    const store = useStore();
    const shouldRedirect = store.auth.isLoggedIn === forAuthorized;

    return (
      <Route
        {...rest}
        render={(props) =>
          shouldRedirect ? (
            <Component {...props} />
          ) : (
            <Redirect to={redirectTo} />
          )
        }
      />
    );
  },
);

export const DisableOnRoutes = ({ paths = [], children }) => {
  const location = useLocation();
  const isMatch =
    paths.filter((path) => matchPath(location.pathname, { path }))
      .length > 0;

  return !isMatch ? children : null;
};

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          forAuthorized={false}
          path={routes.auth}
          component={Auth}
        />
        <Route path={routes.home} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
