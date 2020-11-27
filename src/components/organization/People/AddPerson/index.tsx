import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import IFormDataAddPerson from '../../../../interfaces/forms/IFormDataAddPerson';
import { Form, Button, Alert, Badge, Card } from 'react-bootstrap';
import classNames from 'classnames';
import RBRef from '../../../../types/RBRef';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import ITeam from '../../../../interfaces/ITeam';
import { getAllTeams } from '../../../../services/team';
import { Typeahead } from 'react-bootstrap-typeahead';
import { addPerson, getPerson, updatePerson } from '../../../../services/people';
import Role from '../../../../enums/Role';
import { useToasts } from 'react-toast-notifications';
import { IUser } from '../../../../interfaces/IUser';
import getAuthenticatedUser from '../../../../services/user/getAuthenticatedUser';

export interface IAddPersonProps {
  personId?: string;
  onPersonAdded?: () => void;
}

const AddPerson: React.FunctionComponent<IAddPersonProps> = props => {
  const { register, handleSubmit, errors } = useForm<IFormDataAddPerson>();
  const [teams, setTeams] = useState<ITeam[]>(new Array<ITeam>());
  const [selectedTeam, setSelectedTeam] = useState<ITeam>({ _id: '' } as ITeam);
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const { addToast } = useToasts();
  const [addPersonErrorMessage, setAddPersonErrorMessage] = useState<string>();
  const [currentPerson, setCurrentPerson] = useState<IUser>();
  const [currentLoggedUser, setCurrentLoggedUser] = useState<IUser>();

  const getCurrentPersonData = (personId: string) => {
    getPerson(personId)
      .then(setCurrentPerson)
      .catch(console.error);
  };

  useEffect(() => {
    getAllTeams().then(res => {
      setTeams(res);
    });

    getAuthenticatedUser()
      .then(setCurrentLoggedUser);

    if (props.personId) {
      getCurrentPersonData(props.personId);
    }
  }, [props.personId]);

  useEffect(() => {
    const teamFound = teams.find(
      t => t._id === currentPerson?.team._id
    ) as ITeam;
    setSelectedTeam(teamFound);
  }, [currentPerson, teams]);

  const onSubmit = handleSubmit(data => {
    setIsAddingPerson(true);

    if (!props.personId) {
      data.password = '123';
      data.role = Role.Normal;

      addPerson(data)
        .then(res => {
          addToast(`${data.emailAddress} foi adicionado(a) com sucesso.`, {
            appearance: 'success',
          });

          if (props.onPersonAdded !== undefined) {
            props.onPersonAdded();
          }
        })
        .catch(err => {
          const responseMsg: string = err.response.data.errmsg;

          if (responseMsg.includes('duplicate key')) {
            setAddPersonErrorMessage(
              'Já existe uma pessoa cadastrada com estes dados.'
            );
          } else {
            setAddPersonErrorMessage('Ocorreu um erro ao criar a pessoa.');
          }
        })
        .finally(() => {
          setIsAddingPerson(false);
        });
    } else {
      updatePerson(props.personId, data)
        .then(res => {
          addToast(`${data.emailAddress} foi alterado(a) com sucesso.`, {
            appearance: 'success',
          });

          if (props.onPersonAdded !== undefined) {
            props.onPersonAdded();
          }
        })
        .catch(err => {
          const responseMsg: string = err.response.data.errmsg;

          if (responseMsg.includes('duplicate key')) {
            setAddPersonErrorMessage(
              'Já existe uma pessoa cadastrada com estes dados.'
            );
          } else {
            setAddPersonErrorMessage('Ocorreu um erro ao criar a pessoa.');
          }
        })
        .finally(() => {
          setIsAddingPerson(false);
        });
    }
  });

  const handleTeamChange = (selectedTeam: ITeam[]) => {
    setSelectedTeam(selectedTeam[0]);
  };

  return (
    <Form onSubmit={onSubmit}>
      {addPersonErrorMessage && (
        <Alert variant="danger">
          <Alert.Heading>Oops!</Alert.Heading>
          {addPersonErrorMessage}
        </Alert>
      )}
      <Form.Group controlId="firstName">
        <Form.Label>Primeiro nome</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          className={classNames({
            'is-invalid': errors.firstName,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="words"
          defaultValue={props.personId ? currentPerson?.firstName : ''}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Último nome</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          className={classNames({
            'is-invalid': errors.lastName,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="words"
          defaultValue={props.personId ? currentPerson?.lastName : ''}
        />
      </Form.Group>
      <Form.Group controlId="emailAddress">
        <Form.Label>Endereço de e-mail</Form.Label>
        <Form.Control
          type="email"
          name="emailAddress"
          className={classNames({
            'is-invalid': errors.emailAddress,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          defaultValue={props.personId ? currentPerson?.emailAddress : ''}
        />
      </Form.Group>
      <Form.Group controlId="position">
        <Form.Label>Cargo</Form.Label>
        <Form.Control
          type="text"
          name="position"
          className={classNames({
            'is-invalid': errors.position,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="words"
          defaultValue={props.personId ? currentPerson?.position : ''}
        />
      </Form.Group>
      <Form.Group controlId="team">
        <Form.Label>Equipe</Form.Label>
        <Form.Control
          type="hidden"
          name="team"
          className={classNames({
            'is-invalid': errors.position,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          value={selectedTeam?._id}
        ></Form.Control>
        <div>
          <Badge variant="secondary" className="mb-1">
            {selectedTeam?.name}
          </Badge>
        </div>
        <Typeahead
          options={teams}
          labelKey="name"
          id="team-typeahead-form"
          emptyLabel="Nenhuma equipe encontrada."
          onChange={handleTeamChange}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          renderMenuItemChildren={option => (
            <div>
              <small className="text-muted">{option._id}</small>
              <div>{option.name}</div>
            </div>
          )}
        ></Typeahead>
      </Form.Group>
      {props.personId && currentLoggedUser?.role === Role.Super &&
        <Card className="mb-3">
          <Card.Header className="p-2">
            Segurança
          </Card.Header>
          <Card.Body className="p-2">
            <Form.Group controlId="role">
              <Form.Control
                name="role"
                as="select"
                className={classNames({
                  'is-invalid': errors.firstName,
                })}
                ref={
                  register({
                    required: true,
                  }) as RBRef
                }>
                <option value={Role.Normal} selected={currentPerson?.role === Role.Normal ? true : false}>Usuário normal</option>
                <option value={Role.Super} selected={currentPerson?.role === Role.Super ? true : false}>Super usuário</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="isActive" className="mb-2">
              <Form.Check
                name="isActive"
                type="checkbox"
                label="Está ativo?"
                defaultChecked={currentPerson?.isActive}
                className={classNames({
                  'is-invalid': errors.firstName,
                  'ml-1': true
                })}
                ref={
                  register({
                    required: false,
                  }) as RBRef
                } />
            </Form.Group>
          </Card.Body>
        </Card>}
      <Alert variant="info">
        A senha de acesso será enviada para o <strong>e-mail cadastrado</strong>
      </Alert>
      <Button variant="success" type="submit" block disabled={isAddingPerson}>
        {props.personId && (
          <>
            <FontAwesomeIcon icon={faPen} /> Editar
          </>
        )}
        {!props.personId && (
          <>
            <FontAwesomeIcon icon={faPlus} /> Adicionar
          </>
        )}
      </Button>
    </Form>
  );
};

export default AddPerson;
