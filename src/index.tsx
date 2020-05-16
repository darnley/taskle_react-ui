import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import PrivateRoute from './components/authentication/PrivateRoute';
import Login from './components/authentication/SignIn';
import SignOut from './components/authentication/SignOut';
import MyProjects from './components/me/MyProjects';
import CreateProject from './components/me/MyProjects/CreateProject';
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
                  tabs={[
                    <Tab eventKey="home" title="Home" key={1}>
                      test
                    </Tab>,
                    <Tab eventKey="profile" title="Profile" key={2}>
                      test
                    </Tab>,
                  ]}
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
              sidebarComponent={<CreateProject />}
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
                      eventkey="project-stats"
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
        <Route path={routeConfig.signIn} exact={true} component={Login} />
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
