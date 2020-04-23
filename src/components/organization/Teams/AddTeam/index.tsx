import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import IFormDataAddTeam from '../../../../interfaces/forms/IFormDataAddTeam';
import classNames from 'classnames';
import RBRef from '../../../../types/RBRef';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addTeam } from '../../../../services/team';
import { useToasts } from 'react-toast-notifications';

export interface IAddTeamProps {
  onTeamAdded: () => void;
}

const AddTeam: React.FunctionComponent<IAddTeamProps> = props => {
  const { register, handleSubmit, errors } = useForm<IFormDataAddTeam>();
  const [isAddingTeam, setIsAddingTeam] = useState(false);
  const { addToast } = useToasts();

  const onSubmit = handleSubmit(data => {
    setIsAddingTeam(true);

    addTeam(data).then(res => {
      addToast(`${res.name} foi adicionado(a) com sucesso.`, {
        appearance: 'success',
      });

      if (props.onTeamAdded !== undefined) {
        props.onTeamAdded();
      }
    });
  });

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
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
        />
      </Form.Group>
      <Button type="submit" variant="success" block disabled={isAddingTeam}>
        <FontAwesomeIcon icon={faPlus} /> Adicionar
      </Button>
    </Form>
  );
};

export default AddTeam;
