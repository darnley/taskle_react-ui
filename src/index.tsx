import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/authentication/SignIn';
import PrivateRoute from './components/authentication/PrivateRoute';
import routeConfig from './routes.config';
import SignOut from './components/authentication/SignOut';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact={true} component={App} />
      <PrivateRoute path={routeConfig.signOut} component={SignOut} />
      <Route path={routeConfig.signIn} exact={true} component={Login} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
