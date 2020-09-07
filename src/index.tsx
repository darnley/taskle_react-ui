import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import PrivateRoute from './components/authentication/PrivateRoute';
import Login from './components/authentication/SignIn';
import SignOut from './components/authentication/SignOut';
import MyProjects from './components/me/MyProjects';
import CreateOrEditProject from './components/me/MyProjects/CreateOrEditProject';
import MyTasks from './components/me/MyTasks';
import Test from './components/Test';
import './index.scss';
import routeConfig from './routes.config';
import * as serviceWorker from './serviceWorker';
import Page from './components/Page';
import { Tab } from 'react-bootstrap';
import People from './components/organization/People';
import Teams from './components/organization/Teams';
import { ToastProvider } from 'react-toast-notifications';
import ProjectTasks from './components/projects/ProjectTasks';
import ProjectStats from './components/projects/ProjectStats';
import PasswordReset from './components/authentication/PasswordReset';
import OrganizationStats from './components/organization/Stats';
import PasswordResetRequest from './components/authentication/PasswordResetRequest';

ReactDOM.render(
  <ToastProvider autoDismiss>
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          path="/home"
          exact={true}
          component={() => <Redirect to="/me/projects" />}
        />
        <PrivateRoute
          path="/me/projects"
          exact={true}
          component={() => (
            <App
              middleComponent={
                <Page
                  name="Meus projetos"
                  children={<MyProjects />}
                  //defaultTab="profile"
                  tabs={[]}
                />
              }
            />
          )}
        />
        <PrivateRoute
          path="/me/projects/create"
          exact={true}
          component={() => (
            <App
              middleComponent={<MyProjects />}
              sidebarComponent={<CreateOrEditProject />}
            />
          )}
        />
        <PrivateRoute
          path="/me/tasks"
          exact={true}
          component={() => (
            <App
              middleComponent={
                <Page name="Minhas tarefas" children={<MyTasks />} tabs={[]} />
              }
            />
          )}
        />
        <PrivateRoute
          path="/organization"
          exact={true}
          component={() => (
            <App
              middleComponent={
                <Page
                  name="Minha organização"
                  defaultTab="org-people"
                  tabs={[
                    <Tab
                      eventKey="org-people"
                      title="Pessoas"
                      key={1}
                      children={<People />}
                    />,
                    <Tab
                      eventKey="org-teams"
                      title="Equipes"
                      key={2}
                      children={<Teams />}
                    />,
                  ]}
                />
              }
            />
          )}
        />
        <PrivateRoute
          path="/organization/stats"
          exact={true}
          component={() => (
            <App
              middleComponent={
                <Page
                  name="Minha organização"
                  defaultTab="org-stats"
                  tabs={[
                    <Tab
                      eventKey="org-stats"
                      title="Estatísticas"
                      key={1}
                      children={<OrganizationStats />}
                    />,
                  ]}
                />
              }
            />
          )}
        />
        <PrivateRoute
          path="/projects/:projectId"
          exact
          component={() => (
            <App
              middleComponent={
                <Page
                  name="Projeto"
                  defaultTab="project-tasks"
                  tabs={[
                    <Tab
                      eventKey="project-tasks"
                      title="Tarefas"
                      key={1}
                      children={<ProjectTasks />}
                    />,
                    <Tab
                      eventKey="project-stats"
                      title="Estatísticas"
                      key={2}
                      children={<ProjectStats />}
                    />,
                  ]}
                />
              }
            />
          )}
        />
        <PrivateRoute path={routeConfig.signOut} component={SignOut} />
        <Route
          path={routeConfig.passwordReset + '/:userId/:key1/:key2'}
          exact={true}
          component={PasswordReset}
        />
        <Route path={routeConfig.signIn} exact={true} component={Login} />
        <Route
          path={routeConfig.passwordResetRequest}
          exact={true}
          component={PasswordResetRequest}
        />
        <Route path="/" exact={true} component={() => <Redirect to="home" />} />
      </Switch>
    </BrowserRouter>
  </ToastProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
