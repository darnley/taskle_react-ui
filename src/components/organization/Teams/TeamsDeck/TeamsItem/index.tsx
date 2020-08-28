import React, { useState, useContext, useEffect } from 'react';
import ITeam from '../../../../../interfaces/ITeam';
import { Card, Row, Col } from 'react-bootstrap';
import { IUser } from '../../../../../interfaces/IUser';
import { getTeamPeople } from '../../../../../services/team';
import Skeleton from 'react-loading-skeleton';

export interface ITeamsItemProps {
  team: ITeam;
}

const TeamsItem: React.FunctionComponent<ITeamsItemProps> = props => {
  const [people, setPeople] = useState<IUser[]>([]);
  const [isPeopleDataReady, setIsPeopleDataReady] = useState<boolean>(false);

  const getData = (teamId: string) => {
    getTeamPeople(teamId)
      .then(res => {
        setPeople(res);
        setIsPeopleDataReady(true);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getData(props.team._id);
  }, [props.team._id]);

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={5}>
            <div>{props.team.name}</div>
            <div>
              <small className="text-muted">
                {!isPeopleDataReady && <Skeleton width={50} />}
                {isPeopleDataReady && `${people.length} pessoa(s)`}
              </small>
            </div>
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

export default TeamsItem;
