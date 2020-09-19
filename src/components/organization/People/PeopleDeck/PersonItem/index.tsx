import React, { useContext } from 'react';
import { IUser } from '../../../../../interfaces/IUser';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye } from '@fortawesome/free-regular-svg-icons';
import './styles.scss';
import { Link } from 'react-router-dom';
import SidebarContext from '../../../../../contexts/SidebarContext';
import SeePerson from '../../SeePerson';

export interface IPersonItemProps {
  person: IUser;
}

const PersonItem: React.FunctionComponent<IPersonItemProps> = props => {
  const sidebarContext = useContext(SidebarContext);

  const handleSeePersonClick = (person: IUser) => {
    sidebarContext.setSidebarComponent(<SeePerson person={person} />);
  };

  return (
    <Col md={4} className="pl-0 pr-0">
      <Card className="h-100">
        <Card.Body>
          <Row className="h-100">
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
              <Button
                variant="primary"
                className="h-100 float-right ml-1"
                title="Ver o projeto"
                onClick={() => handleSeePersonClick(props.person)}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PersonItem;
