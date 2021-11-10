import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import { routes } from '../routes';
import Login from '../Login/Login';
import Restore from '../Restore/Restore';
import Register from '../Register/Register';
import s from './Auth.module.scss';
import './Auth.scss';

function Auth() {
  return (
    <>
      <Header dark={false} />
      <main className="container">
        <div className={`${s.auth}`}>
          <Switch>
            <Route path={routes.login} component={Login} exact />
            <Route path={routes.restore} component={Restore} exact />
            <Route
              path={routes.register}
              component={Register}
              exact
            />
            <Route
              path={routes.auth}
              render={() => <Redirect to={routes.login} />}
              exact
            />
          </Switch>
        </div>
      </main>
    </>
  );
}

export default Auth;
