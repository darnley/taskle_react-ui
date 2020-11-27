import React, { useState, useContext, useEffect } from 'react';
import ITeam from '../../../../../interfaces/ITeam';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { IUser } from '../../../../../interfaces/IUser';
import { getTeamPeople } from '../../../../../services/team';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarContext from '../../../../../contexts/SidebarContext';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import AddTeam from '../../AddTeam';

export interface ITeamsItemProps {
  team: ITeam;
}

const TeamsItem: React.FunctionComponent<ITeamsItemProps> = props => {
  const [people, setPeople] = useState<IUser[]>([]);
  const [isPeopleDataReady, setIsPeopleDataReady] = useState<boolean>(false);

  const sidebarContext = useContext(SidebarContext);

  const getData = (teamId: string) => {
    getTeamPeople(teamId)
      .then(res => {
        setPeople(res);
        setIsPeopleDataReady(true);
      })
      .catch(console.error);
  };

  const onTeamSubmited = () => {
    sidebarContext.removeSidebarComponent();
    getData(props.team._id);
  };

  const handleSeeTeamClick = (team: ITeam) => {
    sidebarContext.setSidebarComponent(
      <AddTeam team={team} onTeamAdded={onTeamSubmited} />
    );
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
            <Button
              variant="primary"
              className="h-100 float-right ml-1"
              title="Ver a equipe"
              onClick={() => handleSeeTeamClick(props.team)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TeamsItem;
