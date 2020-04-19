import React from 'react';
import ITeam from '../../../../../interfaces/ITeam';
import { Card, Row, Col } from 'react-bootstrap';

export interface ITeamsItemProps {
  team: ITeam;
}

const TeamsItem: React.FunctionComponent<ITeamsItemProps> = props => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={5}>{props.team.name}</Col>
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

export default TeamsItem;
