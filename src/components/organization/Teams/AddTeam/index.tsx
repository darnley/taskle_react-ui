import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import IFormDataAddTeam from '../../../../interfaces/forms/IFormDataAddTeam';
import classNames from 'classnames';
import RBRef from '../../../../types/RBRef';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import {
  addTeam,
  updateTeam,
  getTeam,
  getTeamPeople,
} from '../../../../services/team';
import { useToasts } from 'react-toast-notifications';
import ITeam from '../../../../interfaces/ITeam';
import { IUser } from '../../../../interfaces/IUser';
import Skeleton from 'react-loading-skeleton';
import getAuthenticatedUser from '../../../../services/user/getAuthenticatedUser';
import Role from '../../../../enums/Role';

export interface IAddTeamProps {
  onTeamAdded: () => void;
  team?: ITeam;
}

const AddTeam: React.FunctionComponent<IAddTeamProps> = props => {
  const { register, handleSubmit, errors } = useForm<IFormDataAddTeam>();
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const { addToast } = useToasts();
  const [team, setTeam] = useState<ITeam>();
  const [teamPeople, setTeamPeople] = useState<IUser[]>();
  const [currentLoggedUser, setCurrentLoggedUser] = useState<IUser>();

  const onSubmit = handleSubmit(data => {
    setIsAddingTeam(true);

    if (!props.team) {
      addTeam(data).then(res => {
        addToast(`${res.name} foi adicionado(a) com sucesso.`, {
          appearance: 'success',
        });
      });
    } else {
      updateTeam(props.team._id, data).then(res => {
        addToast(`${res.name} foi alterado com sucesso.`, {
          appearance: 'success',
        });
      });
    }

    if (props.onTeamAdded !== undefined) {
      props.onTeamAdded();
    }
  });

  const getData = (teamId: string) => {
    getTeam(teamId)
      .then(setTeam)
      .catch(console.error);

    getTeamPeople(teamId)
      .then(setTeamPeople)
      .catch(console.error);
  };

  useEffect(() => {
    if (props.team) {
      getData(props.team._id);
    }

    getAuthenticatedUser()
      .then(setCurrentLoggedUser);
  }, [props.team]);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Nome da equipe</Form.Label>
        <Form.Control
          type="text"
          name="name"
          className={classNames({
            'is-invalid': errors.name,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          defaultValue={props.team ? props.team.name : ''}
        />
      </Form.Group>
      {props.team && (
        <div className="mb-3">
          <div>Pessoas neste time</div>
          {!teamPeople && <Skeleton width="100%" height={64.4} count={3} />}
          {teamPeople && (
            <ListGroup>
              {teamPeople.length === 0 && (
                <ListGroup.Item className="text-muted">
                  Não há pessoas neste time.
                </ListGroup.Item>
              )}
              {teamPeople.length > 0 &&
                teamPeople.map(teamPerson => (
                  <ListGroup.Item key={teamPerson._id}>
                    <div>{`${teamPerson.firstName} ${teamPerson.lastName}`}</div>
                    <div>
                      <small className="text-muted">
                        {teamPerson.emailAddress}
                      </small>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </div>
      )}
      {currentLoggedUser?.role === Role.Super &&
        <Button type="submit" variant="success" block disabled={isAddingTeam}>
          {!props.team && (
            <>
              <FontAwesomeIcon icon={faPlus} /> Adicionar
            </>
          )}
          {props.team && (
            <>
              <FontAwesomeIcon icon={faPen} /> Editar
            </>
          )}
        </Button>}
    </Form>
  );
};

export default AddTeam;
