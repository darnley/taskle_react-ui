import React from 'react';
import { IUser } from '../../../../../interfaces/IUser';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import './styles.scss';

export interface IPersonItemProps {
  person: IUser;
}

const PersonItem: React.FunctionComponent<IPersonItemProps> = props => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={5}>
            <div className="person-name font-weight-bold">
              {props.person.firstName + ' ' + props.person.lastName}
              <a
                href={`mailto:${props.person.emailAddress}`}
                rel="noopener noreferrer"
                target="_blank"
                className="person-name-mail"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
            <small className="person-position text-muted font-italic">
              {props.person.position ?? 'Sem cargo'}
            </small>
          </Col>
          <Col md={5}></Col>
          <Col md={2}>
            <div className="view-profile">
              <a href="#">Ver perfil</a>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PersonItem;
