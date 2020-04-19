import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import IFormDataAddPerson from '../../../../interfaces/forms/IFormDataAddPerson';
import { Form, Button } from 'react-bootstrap';
import classNames from 'classnames';
import RBRef from '../../../../types/RBRef';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ITeam from '../../../../interfaces/ITeam';
import { getAllTeams } from '../../../../services/team';
import { Typeahead } from 'react-bootstrap-typeahead';
import { addPerson } from '../../../../services/people';
import Role from '../../../../enums/Role';
import { useToasts } from 'react-toast-notifications';

export interface IAddPersonProps {
  onPersonAdded?: () => void;
}

const AddPerson: React.FunctionComponent<IAddPersonProps> = props => {
  const { register, handleSubmit, errors } = useForm<IFormDataAddPerson>();
  const [teams, setTeams] = useState<ITeam[]>(new Array<ITeam>());
  const [selectedTeam, setSelectedTeam] = useState<ITeam>({ _id: '' } as ITeam);
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    getAllTeams().then(res => {
      setTeams(res);
    });
  }, []);

  const onSubmit = handleSubmit(data => {
    setIsAddingPerson(true);

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
        console.error(err);
      })
      .finally(() => {
        setIsAddingPerson(false);
      });
  });

  const handleTeamChange = (selectedTeam: ITeam[]) => {
    setSelectedTeam(selectedTeam[0]);
  };

  return (
    <Form onSubmit={onSubmit}>
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
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Primeiro nome</Form.Label>
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
      <Button variant="success" type="submit" block disabled={isAddingPerson}>
        <FontAwesomeIcon icon={faPlus} /> Adicionar
      </Button>
    </Form>
  );
};

export default AddPerson;
