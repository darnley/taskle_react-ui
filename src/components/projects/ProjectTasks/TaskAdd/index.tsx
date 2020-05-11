import React, { useState, useEffect, useRef } from 'react';
import { ITask } from '../../../../interfaces/ITask';
import { useForm } from 'react-hook-form';
import IFormDataAddTask from '../../../../interfaces/forms/IFormDataAddTask';
import { getTask } from '../../../../services/project/task';
import { Form, Button, Badge, FormControl } from 'react-bootstrap';
import classNames from 'classnames';
import RBRef from '../../../../types/RBRef';
import { IUser } from '../../../../interfaces/IUser';
import { getAllPeople } from '../../../../services/people';
import { Typeahead, TypeaheadModel } from 'react-bootstrap-typeahead';
import TaskComplexity from '../../../../enums/TaskComplexity';
import IProject from '../../../../interfaces/IProject';
import { getAllKeywords } from '../../../../services/keywords';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import moment from 'moment';

export interface ITaskEditProps {
  projectId?: string;
  taskId?: string;
}

const TaskAdd: React.FunctionComponent<ITaskEditProps> = props => {
  const { register, handleSubmit, errors } = useForm<IFormDataAddTask>();
  const [task, setTask] = useState<ITask>();
  const [people, setPeople] = useState<IUser[]>();
  const [selectedResponsible, setSelectedResponsible] = useState<IUser>();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const typeaheadKeywords = useRef<Typeahead<TypeaheadModel>>();

  useEffect(() => {
    if (props.projectId && props.taskId) {
      getTask(props.projectId!, props.taskId!)
        .then(task => {
          setTask(task);
          setSelectedKeywords(task.keywords);
          setSelectedResponsible(task.responsible);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      setTask({} as ITask);
    }

    getAllPeople()
      .then(people => {
        setPeople(people);
      })
      .catch(err => {
        console.error(err);
      });

    getAllKeywords()
      .then(keywords => {
        setKeywords(keywords);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.projectId, props.taskId]);

  const onSubmit = handleSubmit(data => {
    data.project = {
      _id: props.projectId!,
    } as IProject;

    data.responsible = {
      _id: (data as any).responsibleTemp,
    } as IUser;

    delete (data as any).responsibleTemp;

    data.keywords = selectedKeywords!;

    if (data.deliveryDate)
      data.deliveryDate = moment(data.deliveryDate)
        .local()
        .toDate();

    console.log(data);

    if (task?._id) {
      console.log('exitent');
    } else {
      console.log('non existent');
    }
  });

  const handleResponsibleChange = (selectedUser: IUser[]) => {
    setSelectedResponsible(selectedUser[0]);
  };

  const handleKeywordChange = (selectedKeyword: string[]) => {
    if (!selectedKeyword[0] || selectedKeywords.includes(selectedKeyword[0]))
      return;

    setSelectedKeywords([...selectedKeywords!, selectedKeyword[0]]);

    (typeaheadKeywords.current as any).clear();
  };

  const handleComplexityChange = (
    event: React.FormEvent<FormControl & HTMLInputElement>
  ) => {
    event.preventDefault();
    const currentValue = event.currentTarget.value as TaskComplexity;

    if (task) {
      setTask(
        prevTask =>
          ({
            ...prevTask,
            complexity: currentValue,
          } as ITask)
      );
    }
  };

  const removeKeywordFromSelectedOnes = (keywordToRemove: string) => {
    const foundIndex = selectedKeywords.findIndex(
      keyword => keyword === keywordToRemove
    );

    if (foundIndex > -1) {
      let arr = [...selectedKeywords];
      arr.splice(foundIndex, 1);
      setSelectedKeywords(arr);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="responsible">
        <Form.Label>Responsável</Form.Label>
        <Form.Control
          type="hidden"
          name="responsibleTemp"
          value={selectedResponsible?._id}
          ref={
            register({
              required: true,
            }) as RBRef
          }
        />
        <Typeahead
          options={people || []}
          labelKey="emailAddress"
          id="people-typeahead-form"
          selected={
            selectedResponsible
              ? [people?.find(p => p._id === selectedResponsible?._id) as IUser]
              : undefined
          }
          emptyLabel="Nenhuma pessoa encontrada."
          onChange={handleResponsibleChange}
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
          onChange={e => null}
          value={task?.description}
          autoComplete="off"
          autoCorrect="off"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Palavras-chave</Form.Label>
        <div className="mb-2 add-task-keywords">
          {selectedKeywords.map((keyword, index) => (
            <Badge variant="secondary" className="mr-1" key={keyword}>
              {keyword}{' '}
              <span
                className="times-icon"
                onClick={() => removeKeywordFromSelectedOnes(keyword)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </Badge>
          ))}
        </div>
        <Typeahead
          ref={typeaheadKeywords as any}
          options={(keywords || []).filter(
            kw => !selectedKeywords.includes(kw)
          )}
          id="keywords-typeahead-form"
          emptyLabel="Nenhuma palavra-chave encontrada."
          onChange={handleKeywordChange}
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
          name="complexity"
          className={classNames({
            'is-invalid': errors.complexity,
          })}
          ref={
            register({
              required: true,
            }) as RBRef
          }
          custom
          value={task?.complexity}
          onChange={handleComplexityChange}
        >
          <option value={TaskComplexity.Low}>Baixa</option>
          <option value={TaskComplexity.Medium}>Média</option>
          <option value={TaskComplexity.High}>Alta</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="deliveryDate">
        <Form.Label>Data de entrega</Form.Label>
        <Form.Control
          type="datetime-local"
          name="deliveryDate"
          className={classNames({
            'is-invalid': errors.deliveryDate,
          })}
          ref={
            register({
              required: false,
            }) as RBRef
          }
          onChange={e => null}
          value={moment(task?.deliveryDate).format('YYYY-MM-DDTHH:mm')}
          min={
            task?.deliveryDate
              ? moment(task?.deliveryDate).format('YYYY-MM-DDTHH:mm')
              : moment(new Date()).format('YYYY-MM-DDTHH:mm')
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
