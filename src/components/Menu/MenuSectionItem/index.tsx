import React, { FunctionComponent } from 'react';
import { Nav } from 'react-bootstrap';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

type MenuSectionItemProps = {
  href: string;
  text: string;
  number?: number;
  /**
   * FontAwesome icon
   */
  icon?: IconProp;
};

const MenuSectionItem: FunctionComponent<MenuSectionItemProps> = props => {
  let icon: IconProp = faChevronRight;

  if (props.icon) {
    icon = props.icon;
  }

  return (
    <Nav.Link href={props.href}>
      <span className="menu-section-item-icon mr-3">
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className="menu-section-item-text">{props.text}</span>
      {props.number && (
        <span className="menu-section-item-number">{props.number}</span>
      )}
    </Nav.Link>
  );
};

export default MenuSectionItem;
