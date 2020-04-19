import React, { useState, useEffect, useMemo } from 'react';
import ITeam from '../../../interfaces/ITeam';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getAllTeams } from '../../../services/team';
import TeamsDeck from './TeamsDeck';

export interface ITeamsProps {}

const Teams: React.FunctionComponent<ITeamsProps> = props => {
  const [teams, setTeams] = useState<ITeam[]>();
  const [teamList, setTeamList] = useState<ITeam[]>();
  const [searchTeam, setSearchTeam] = useState('');

  useEffect(() => {
    getAllTeams().then(res => {
      setTeams(res);
      setTeamList(res);
    });
  }, []);

  useMemo(() => {
    if (searchTeam.trim().length > 0) {
      const found = teams?.filter(team =>
        team.name.toLocaleLowerCase().includes(searchTeam.toLocaleLowerCase())
      );

      setTeamList(found);
    } else {
      setTeamList(teams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTeam, teams]);

  const handleTeamSearchChange = e => {
    e.preventDefault();

    // eslint-disable-next-line eqeqeq
    if (searchTeam != e.currentTarget.value) {
      setSearchTeam(e.currentTarget.value);
    }
  };

  const handleCreateTeamClick = e => {};

  return (
    <>
      <div className="teams-header mb-3 d-flex">
        <InputGroup className="mr-3">
          <FormControl
            placeholder="Pesquisa pela equipe..."
            onChange={handleTeamSearchChange}
          />
        </InputGroup>
        <span className="float-right">
          <Button className="text-nowrap" onClick={handleCreateTeamClick}>
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Adicionar equipe
          </Button>
        </span>
      </div>
      <div className="people-list">
        {!teamList && 'Obtendo dados...'}
        <TeamsDeck teams={teamList} />
      </div>
    </>
  );
};

export default Teams;
