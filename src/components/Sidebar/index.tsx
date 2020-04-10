import React, { FunctionComponent } from 'react';
import './styles.scss';
import { Container } from 'react-bootstrap';
import ISidebarProps from '@app/interfaces/props/ISidebarProps';

const Sidebar: FunctionComponent<ISidebarProps> = props => {
  return (
    <>
      <div id="right-sidebar" className="h-100 pr-0">
        <Container fluid className="pt-2">
          {props.children}
        </Container>
      </div>
    </>
  );
};

export default Sidebar;
