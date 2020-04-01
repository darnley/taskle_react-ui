import React, { useMemo, useState, useEffect } from 'react';
import './styles.scss';
import { Nav, Media } from 'react-bootstrap';
import MenuSection from './MenuSection';
import MenuSectionItem from './MenuSectionItem';
import {
  faProjectDiagram,
  faTasks,
  faPeopleCarry,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';
import getAuthenticatedUser from '../../services/user/getAuthenticatedUser';
import { IUser } from '../../interfaces/IUser';

const Menu = props => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    getAuthenticatedUser().then(res => {
      setUser(res);
    });
  }, []);

  return (
    <>
      <section id="current-user-info">
        <Media>
          <img
            width={30}
            height={30}
            className="user-avatar rounded-circle mr-3"
            src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_171290cfcab%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_171290cfcab%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2214.5625%22%20y%3D%2237.2828125%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            alt="Generic placeholder"
          />
          <Media.Body className="user-name">
            {user?.firstName} {user?.lastName}
          </Media.Body>
        </Media>
      </section>
      <section id="menu-links">
        <Nav defaultActiveKey="/home" className="flex-column">
          <MenuSection name="Minha conta">
            <MenuSectionItem
              href="/me/projects"
              text="Meus projetos"
              icon={faProjectDiagram}
              number={7}
            />
            <MenuSectionItem
              href="/me/tasks"
              text="Minhas tarefas"
              icon={faTasks}
              number={3}
            />
          </MenuSection>
          <MenuSection name="Minha organização">
            <MenuSectionItem
              href="/home"
              text="Pessoas"
              icon={faPeopleCarry}
              number={145}
            />
            <MenuSectionItem
              href="/home"
              text="Estatísticas"
              icon={faChartPie}
            />
          </MenuSection>
        </Nav>
      </section>
    </>
  );
};

export default Menu;
