import React, { useState, useEffect } from 'react';
import { ITask } from '../../../../interfaces/ITask';
import { useForm } from 'react-hook-form';
import IFormDataAddTask from '../../../../interfaces/forms/IFormDataAddTask';
import { getTask } from '../../../../services/project/task';
import { Form, Button } from 'react-bootstrap';
import classNames from 'classnames';
import RBRef from '../../../../types/RBRef';
import { IUser } from '../../../../interfaces/IUser';
import { getAllPeople } from '../../../../services/people';
import { Typeahead } from 'react-bootstrap-typeahead';
import TaskComplexity from '../../../../enums/TaskComplexity';

export interface ITaskEditProps {
  projectId?: string;
  taskId?: string;
}

const TaskAdd: React.FunctionComponent<ITaskEditProps> = props => {
  const { register, handleSubmit, errors } = useForm<IFormDataAddTask>();
  const [task, setTask] = useState<ITask>();
  const [people, setPeople] = useState<IUser[]>();
  const [selectedResponsible, setSelectedResponsible] = useState<IUser>();
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    getTask(props.projectId!, props.taskId!)
      .then(task => {
        setTask(task);
      })
      .catch(err => {
        console.error(err);
      });

    getAllPeople()
      .then(people => {
        setPeople(people);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.projectId, props.taskId]);

  const onSubmit = handleSubmit(data => {
    console.log(1);
  });

  const handleResponsibleChange = (selectedUser: IUser[]) => {
    setSelectedResponsible(selectedUser[0]);
  };

  const handleKeywordChange = (selectedKeyword: string[]) => {
    // nothing
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="responsible">
        <Form.Label>Responsável</Form.Label>
        <Form.Control
          type="hidden"
          name="responsible"
          value={selectedResponsible?._id}
          ref={
            register({
              required: true,
            }) as RBRef
          }
        />
        <Typeahead
          options={people}
          labelKey="emailAddress"
          id="people-typeahead-form"
          emptyLabel="Nenhuma pessoa encontrada."
          onChange={handleResponsibleChange}
          className={classNames({
            'is-invalid': errors.responsible,
          })}
          renderMenuItemChildren={(option: IUser) => (
            <div>
              <div>{option.firstName + ' ' + option.lastName}</div>
              <small className="text-muted">{option.emailAddress}</small>
            </div>
          )}
        ></Typeahead>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          className={classNames({
            'is-invalid': errors.description,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          autoComplete="off"
          autoCorrect="off"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Palavras-chave</Form.Label>
        <Typeahead
          options={keywords}
          labelKey="keywords"
          id="keywords-typeahead-form"
          emptyLabel="Nenhuma palavra-chave encontrada."
          onChange={handleKeywordChange}
          className={classNames({
            'is-invalid': errors.keywords,
          })}
          renderMenuItemChildren={(option: string) => (
            <div>
              <div>{option}</div>
            </div>
          )}
        />
      </Form.Group>
      <Form.Group controlId="complexity">
        <Form.Label>Complexidade</Form.Label>
        <Form.Control
          as="select"
          className={classNames({
            'is-invalid': errors.complexity,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          custom
        >
          <option value={TaskComplexity.Low}>Baixa</option>
          <option value={TaskComplexity.Medium}>Média</option>
          <option value={TaskComplexity.High}>Alta</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="deliveryDate">
        <Form.Label>Data de entrega</Form.Label>
        <Form.Control
          type="date"
          name="deliveryDate"
          className={classNames({
            'is-invalid': errors.deliveryDate,
          })}
          ref={
            register({
              required: false,
            }) as RBRef
          }
        />
      </Form.Group>
      <Button type="submit" variant="success" block>
        {props.taskId && 'Editar tarefa'}
        {!props.taskId && 'Criar tarefa'}
      </Button>
    </Form>
  );
};

export default TaskAdd;
