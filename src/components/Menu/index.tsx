import React from 'react';
import './styles.scss';
import { Nav } from 'react-bootstrap';
import MenuSection from './MenuSection';
import MenuSectionItem from './MenuSectionItem';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

const Menu = props => {
  return (
    <>
      <section id="current-user-info">Darnley Costa</section>
      <section id="menu-links">
        <Nav defaultActiveKey="/home" className="flex-column">
          <MenuSection name="Minha conta">
            <MenuSectionItem
              href="/home"
              text="Meus projetos"
              icon={faProjectDiagram}
              number={3}
            />
            <MenuSectionItem href="/home" text="Minhas tarefas" />
          </MenuSection>
          <MenuSection name="Minha organização">
            <MenuSectionItem href="/home" text="Pessoas" />
            <MenuSectionItem href="/home" text="Estatísticas" />
          </MenuSection>
        </Nav>
      </section>
    </>
  );
};

export default Menu;
