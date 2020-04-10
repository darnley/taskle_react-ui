import React from 'react';
import Auth from '../../../utils/authentication';
import { Route, Redirect } from 'react-router-dom';
import routeConfig from '../../../routes.config';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  [x: string]: any;
  component: any;
}) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: routeConfig.signIn, state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
