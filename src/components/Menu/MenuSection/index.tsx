import React, { FunctionComponent } from 'react';
import './styles.scss';
import IMenuSectionProps from '@app/interfaces/props/IMenuSectionProps';

const MenuSection: FunctionComponent<IMenuSectionProps> = props => {
  return (
    <>
      <h5 className="menu-header-section">{props.name}</h5>
      {props.children}
    </>
  );
};

export default MenuSection;
