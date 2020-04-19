import React from 'react';
import ITeam from '../../../../interfaces/ITeam';
import chunkArray from '../../../../utils/chunkArray';
import { CardDeck } from 'react-bootstrap';
import TeamsItem from './TeamsItem';

export interface ITeamsDeckProps {
  teams: ITeam[] | undefined;
}

const TeamsDeck: React.FunctionComponent<ITeamsDeckProps> = props => {
  return (
    <>
      {props.teams &&
        chunkArray(props.teams).map((teams, index) => (
          <CardDeck className="mb-2" key={index}>
            {teams.map(team => (
              <TeamsItem team={team} key={team._id} />
            ))}
          </CardDeck>
        ))}
    </>
  );
};

export default TeamsDeck;
