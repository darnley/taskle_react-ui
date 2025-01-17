import React, { FunctionComponent } from 'react';
import './styles.scss';

interface IMenuSectionProps {
  name: string;
  noBorderTop?: boolean;
}

const MenuSection: FunctionComponent<IMenuSectionProps> = props => {
  return (
    <>
      <h5
        className={`menu-header-section ${
          !props.noBorderTop ? 'border-top mt-3' : 'no-border-top'
        }`}
      >
        {props.name}
      </h5>
      {props.children}
    </>
  );
};

export default MenuSection;
