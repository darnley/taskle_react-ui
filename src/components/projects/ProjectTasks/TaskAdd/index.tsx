import React, { useState, useEffect, useRef } from 'react';
import { ITask } from '../../../../interfaces/ITask';
import { useForm } from 'react-hook-form';
import IFormDataAddTask from '../../../../interfaces/forms/IFormDataAddTask';
import {
  getTask,
  updateTask,
  createTask,
} from '../../../../services/project/task';
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
import { useToasts } from 'react-toast-notifications';
import { parseKeyword } from '../../../../utils/keyword';

export interface ITaskEditProps {
  projectId: string;
  taskId?: string;
  onSuccess?: () => void;
}

const TaskAdd: React.FunctionComponent<ITaskEditProps> = props => {
  const { register, handleSubmit, errors } = useForm<IFormDataAddTask>();
  const [task, setTask] = useState<ITask>();
  const [people, setPeople] = useState<IUser[]>();
  const [selectedResponsible, setSelectedResponsible] = useState<IUser>();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const typeaheadKeywords = useRef<Typeahead<TypeaheadModel>>();
  const { addToast } = useToasts();
  const [
    isKeywordManuallyAddedToArray,
    setIsKeywordManuallyAddedToArray,
  ] = useState(false);

  useEffect(() => {
    if (props.projectId && props.taskId) {
      getTask(props.projectId!, props.taskId!)
        .then(task => {
          setTask(task);
          setSelectedKeywords(task.keywords);
          if (task.responsible) setSelectedResponsible(task.responsible);
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

    if (selectedResponsible) data.responsible = selectedResponsible;
    else data.responsible = null;

    data.keywords = selectedKeywords.filter(
      (v, i) => selectedKeywords.indexOf(v) === i
    );

    if (data.deliveryDate)
      data.deliveryDate = moment(data.deliveryDate)
        .local()
        .toDate();

    console.log(data);

    if (task?._id) {
      console.log('exitent');
      updateTask(props.projectId!, props.taskId!, data)
        .then(() => {
          addToast('Tarefa alterada com sucesso', { appearance: 'success' });
          if (props.onSuccess) props.onSuccess();
        })
        .catch(err =>
          addToast(
            <>
              Ocorreu um erro ao alterar a tarefa
              <p>
                <small>{err.message}</small>
              </p>
            </>,
            {
              appearance: 'error',
            }
          )
        );
    } else {
      console.log('non existent');
      createTask(props.projectId, data)
        .then(res => {
          addToast('Tarefa foi adicionada com sucesso', {
            appearance: 'success',
          });
          if (props.onSuccess) props.onSuccess();
        })
        .catch(err =>
          addToast('Ocorreu um erro ao adicionar a tarefa', {
            appearance: 'error',
          })
        );
    }
  });

  const handleResponsibleChange = (selectedUser: IUser[]) => {
    setSelectedResponsible(selectedUser[0] || undefined);
  };

  const handleKeywordChange = (selectedKeyword: string[]) => {
    const inputWord = parseKeyword(selectedKeyword[0]);

    if (!selectedKeyword[0] || selectedKeywords.includes(inputWord)) return;

    setSelectedKeywords([...selectedKeywords!, inputWord]);

    (typeaheadKeywords.current as any).clear();
  };

  const hangleKeywordInputchange = (input: string, e: Event) => {
    e.preventDefault();

    if (isKeywordManuallyAddedToArray) {
      let previousArray = keywords;
      previousArray.splice(previousArray.length - 1, 1);
      setKeywords(previousArray);
    }

    if (!keywords.includes(input.toLowerCase())) {
      const inputWord = input.toLowerCase();
      setKeywords([...keywords, inputWord]);
      setIsKeywordManuallyAddedToArray(true);
    }
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

  const handleDeliverDateChange = (
    event: React.FormEvent<FormControl & HTMLInputElement>
  ) => {
    if (!event.currentTarget.value) return;
    event.preventDefault();
    const currentValue = event.currentTarget.value;
    const dateValue = moment(currentValue).toDate();

    if (task && dateValue) {
      setTask(
        prevTask =>
          ({
            ...prevTask,
            deliveryDate: dateValue,
          } as ITask)
      );
    }
  };

  const handleDescriptionChange = (
    event: React.FormEvent<FormControl & HTMLInputElement>
  ) => {
    if (!event.currentTarget.value) return;
    event.preventDefault();
    const currentValue = event.currentTarget.value;

    if (task) {
      setTask(
        prevTask =>
          ({
            ...prevTask,
            description: currentValue,
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
      <fieldset>
        <Form.Group controlId="responsible">
          <Form.Label>Responsável</Form.Label>
          <Typeahead
            options={people || []}
            labelKey="emailAddress"
            id="people-typeahead-form"
            paginate={false}
            clearButton
            selected={
              selectedResponsible
                ? people?.filter(p => p._id === selectedResponsible._id)
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
                minLength: 20,
              }) as RBRef
            }
            onChange={handleDescriptionChange}
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
            onInputChange={hangleKeywordInputchange}
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
            type="date"
            name="deliveryDate"
            className={classNames({
              'is-invalid': errors.deliveryDate,
            })}
            ref={
              register({
                required: false,
                min: moment(task?.deliveryDate || new Date()).format(
                  'YYYY-MM-DD'
                ),
              }) as RBRef
            }
            onChange={handleDeliverDateChange}
            value={
              task?.deliveryDate
                ? moment(task?.deliveryDate).format('YYYY-MM-DD')
                : undefined
            }
          />
        </Form.Group>
        <Button type="submit" variant="success" block>
          {props.taskId && 'Editar tarefa'}
          {!props.taskId && 'Criar tarefa'}
        </Button>
      </fieldset>
    </Form>
  );
};

export default TaskAdd;
