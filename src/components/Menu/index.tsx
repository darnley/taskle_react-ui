import {
  faChartPie,
  faPeopleCarry,
  faProjectDiagram,
  faTasks,
  faPersonBooth,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
import { Media, Nav, Card, Button } from 'react-bootstrap';
import SidebarContext from '../../contexts/SidebarContext';
import UserInfoContext from '../../contexts/UserInfoContext';
import MenuSection from './MenuSection';
import MenuSectionItem from './MenuSectionItem';
import './styles.scss';
import logoWhite from '../../logo-white.svg';
import { LinkContainer } from 'react-router-bootstrap';
import routeConfig from '../../routes.config';
import Skeleton from 'react-loading-skeleton';
import getMyProjects from '../../services/me/getMyProjects';
import { getMyTasks } from '../../services/me';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPeopleCount } from '../../services/organization';

export interface IMenuProps { }

const Menu: FunctionComponent<IMenuProps> = props => {
  const sidebarContext = useContext(SidebarContext);
  const userInfoContext = useContext(UserInfoContext);

  const [projectCount, setProjectCount] = useState(-1);
  const [taskCount, setTaskCount] = useState(-1);
  const [peopleCount, setPeopleCount] = useState(-1);

  useEffect(() => {
    getMyProjects()
      .then(res => setProjectCount(res.length))
      .catch(console.error);

    getMyTasks()
      .then(res => setTaskCount(res.length))
      .catch(console.error);

    getPeopleCount()
      .then(res => setPeopleCount(res))
      .catch(console.error);
  }, [])

  return (
    <>
      <Card className="mt-3" id="card-menu">
        <Card.Header className="bg-primary text-white">
          <div className="logo text-center">
            <img src={logoWhite} id="menu-header-logo" alt="Taskle" />
          </div>
        </Card.Header>
        <Card.Body className="border-bottom">
          <Media>
            <FontAwesomeIcon icon={faUser} className="mr-2 text-muted" />
            <Media.Body className="user-name">
              {userInfoContext.user &&
                `${userInfoContext.user.firstName} ${userInfoContext.user.lastName}`}
              <span className="float-right">
                <LinkContainer to={routeConfig.signOut}>
                  <Button variant="link" size="sm" className="p-0">
                    Sair
                  </Button>
                </LinkContainer>
              </span>
            </Media.Body>
          </Media>
        </Card.Body>
        <Card.Body className="pt-1">
          <section id="menu-links">
            <Nav defaultActiveKey="/home" className="flex-column">
              <MenuSection name="Minha conta" noBorderTop>
                <MenuSectionItem
                  href="/me/projects"
                  text="Meus projetos"
                  icon={faProjectDiagram}
                  number={projectCount}
                />
                <MenuSectionItem
                  href="/me/tasks"
                  text="Minhas tarefas"
                  icon={faTasks}
                  number={taskCount}
                />
              </MenuSection>
              <MenuSection name="Minha organização">
                <MenuSectionItem
                  href="/organization"
                  text="Pessoas"
                  icon={faPeopleCarry}
                  number={peopleCount}
                />
                <MenuSectionItem
                  href="/organization/stats"
                  text="Estatísticas"
                  icon={faChartPie}
                />
              </MenuSection>
            </Nav>
          </section>
        </Card.Body>
      </Card>
    </>
  );
};

export default Menu;
