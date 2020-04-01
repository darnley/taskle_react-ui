import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/authentication/SignIn';
import PrivateRoute from './components/authentication/PrivateRoute';
import routeConfig from './routes.config';
import SignOut from './components/authentication/SignOut';
import Test from './components/Test';
import MyProjects from './components/me/MyProjects';
import MyTasks from './components/me/MyTasks';
import CreateProject from './components/me/MyProjects/CreateProject';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute
        path="/home"
        exact={true}
        component={() => <Redirect to="/me/projects" />}
      />
      <PrivateRoute
        path="/test-change"
        exact={true}
        component={() => (
          <App middleComponent={<Test />} sidebarComponent={<Test />} />
        )}
      />
      <PrivateRoute
        path="/me/projects"
        exact={true}
        component={() => <App middleComponent={<MyProjects />} />}
      />
      <PrivateRoute
        path="/me/projects/create"
        exact={true}
        component={() => (
          <App
            middleComponent={<MyProjects />}
            sidebarComponent={<CreateProject />}
          />
        )}
      />
      <PrivateRoute
        path="/me/tasks"
        exact={true}
        component={() => <App middleComponent={<MyTasks />} />}
      />
      <PrivateRoute path={routeConfig.signOut} component={SignOut} />
      <Route path={routeConfig.signIn} exact={true} component={Login} />
      <Route path="/" exact={true} component={() => <Redirect to="home" />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
