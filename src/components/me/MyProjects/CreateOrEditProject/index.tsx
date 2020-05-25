import React, {
  FunctionComponent,
  useEffect,
  useState,
  useRef,
  useMemo,
  useContext,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { IUser } from '../../../../interfaces/IUser';
import { useForm } from 'react-hook-form';
import { FormControl, Form, Badge, Button } from 'react-bootstrap';
import { ITask } from '../../../../interfaces/ITask';
import { getAllPeople } from '../../../../services/people';
import { getAllKeywords } from '../../../../services/keywords';
import { Typeahead, TypeaheadModel } from 'react-bootstrap-typeahead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import RBRef from '../../../../types/RBRef';
import IFormDataAddProject from '../../../../interfaces/forms/IFormDataAddProject';
import { parseKeyword } from '../../../../utils/keyword';
import IProject, { IProjectVisibility } from '../../../../interfaces/IProject';
import {
  getProject,
  addProject,
  updateProject,
} from '../../../../services/project';
import ITeam from '../../../../interfaces/ITeam';
import { getAllTeams } from '../../../../services/team';
import SidebarContext from '../../../../contexts/SidebarContext';
import FinishProject from '../FinishProject';

export interface ICreateProjectProps {
  projectId?: string;
  onSuccess?: () => void;
}

interface IVisibility {
  _id: string;
  name: string;
  type: 'person' | 'team';
}

const CreateOrEditProject: FunctionComponent<ICreateProjectProps> = props => {
  const sidebarContext = useContext(SidebarContext);
  const { register, handleSubmit, errors } = useForm<IFormDataAddProject>();
  const [project, setProject] = useState<IProject>();
  const [people, setPeople] = useState<IUser[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [selectedResponsible, setSelectedResponsible] = useState<IUser>();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<IUser[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<ITeam[]>([]);
  const [selectedVisibility, setSelectedVisibility] = useState<IVisibility[]>(
    []
  );
  const [entireVisibility, setEntireVisibility] = useState<IVisibility[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const typeaheadKeywords = useRef<Typeahead<TypeaheadModel>>();
  const typeaheadVisibility = useRef<Typeahead<TypeaheadModel>>();
  const { addToast } = useToasts();
  const [
    isKeywordManuallyAddedToArray,
    setIsKeywordManuallyAddedToArray,
  ] = useState(false);

  useEffect(() => {
    if (props.projectId) {
      getProject(props.projectId)
        .then(project => {
          setProject(project);

          if (project.visibility.users) {
            setSelectedPeople(project.visibility.users as IUser[]);
          }

          if (project.visibility.teams) {
            setSelectedTeams(project.visibility.teams as ITeam[]);
          }

          if (project.keywords) {
            setSelectedKeywords(project.keywords);
          }

          if (project.manager) {
            setSelectedResponsible(project.manager as IUser);
          }
        })
        .catch(err => {
          console.error(err);
          addToast('Ocorreu um erro ao obter as informações do projeto.', {
            appearance: 'error',
          });
        });
    } else {
      setProject({} as IProject);
    }

    getAllPeople()
      .then(people => {
        setPeople(people);

        let peopleVis = people.map(person => {
          let vis: IVisibility = {
            _id: person._id,
            name: person.firstName + ' ' + person.lastName,
            type: 'person',
          };

          return vis;
        });

        setEntireVisibility(previousVisibility => [
          ...previousVisibility,
          ...peopleVis,
        ]);
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

    getAllTeams()
      .then(res => {
        setTeams(res);

        let teamVis = res.map(team => {
          let vis: IVisibility = {
            _id: team._id,
            name: team.name,
            type: 'team',
          };

          return vis;
        });

        setEntireVisibility(previousVisibility => [
          ...previousVisibility,
          ...teamVis,
        ]);
      })
      .catch(err => {
        console.error(err);
        addToast('Ocorreu um erro ao obter as equipes.', {
          appearance: 'error',
        });
      });
  }, [addToast, props.projectId]);

  useMemo(() => {
    setSelectedVisibility(previousVisibility =>
      selectedTeams
        .map(e => {
          let vis: IVisibility = {
            _id: e._id,
            name: e.name,
            type: 'team',
          };

          if (
            previousVisibility?.findIndex(
              l => l._id === e._id && l.type === 'team'
            ) === -1
          ) {
            vis._id = '';
          }

          return vis;
        })
        .filter(e => e._id !== '')
    );
  }, [selectedTeams]);

  useMemo(() => {
    setSelectedVisibility(previousVisibility =>
      selectedPeople
        .map(e => {
          let vis: IVisibility = {
            _id: e._id,
            name: e.firstName + ' ' + e.lastName,
            type: 'person',
          };

          if (
            previousVisibility?.findIndex(
              l => l._id === e._id && l.type === 'person'
            ) === -1
          ) {
            vis._id = '';
          }

          return vis;
        })
        .filter(e => e._id !== '')
    );
  }, [selectedPeople]);

  const onSubmit = handleSubmit(data => {
    data.keywords = selectedKeywords.filter(
      (v, i) => selectedKeywords.indexOf(v) === i
    );

    data.manager = selectedResponsible!;

    data.visibility = {
      users: [],
      teams: [],
    } as IProjectVisibility;

    if (selectedPeople) data.visibility.users = selectedPeople;
    else data.visibility.users = [];

    if (selectedTeams) data.visibility.teams = selectedTeams;
    else data.visibility.teams = [];

    if (!props.projectId) {
      addProject(data)
        .then(res => {
          addToast('Projeto adicionado com sucesso', { appearance: 'success' });

          if (props.onSuccess !== undefined) {
            props.onSuccess();
          }
        })
        .catch(err => {
          addToast(
            <>
              Ocorreu um erro ao criar o projeto
              <p>
                <small>{err.message}</small>
              </p>
            </>,
            {
              appearance: 'error',
            }
          );
        });
    } else {
      delete data._id;

      updateProject(props.projectId, data)
        .then(res => {
          addToast('Projeto alterado com sucesso', { appearance: 'success' });

          if (props.onSuccess !== undefined) {
            props.onSuccess();
          }
        })
        .catch(err => {
          addToast(
            <>
              Ocorreu um erro ao criar o projeto
              <p>
                <small>{err.message}</small>
              </p>
            </>,
            {
              appearance: 'error',
            }
          );
        });
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

  const handleVisibilityChange = (selectedVisibilities: IVisibility[]) => {
    const inputVisibility = selectedVisibilities[0];

    if (
      !inputVisibility ||
      selectedVisibility.findIndex(e => e._id === inputVisibility._id) !== -1
    )
      return;

    setSelectedVisibility([...selectedVisibility!, inputVisibility]);

    if (inputVisibility.type === 'person') {
      setSelectedPeople(previousPeople => [
        ...previousPeople,
        people.find(person => person._id === inputVisibility._id)!,
      ]);
    } else if (inputVisibility.type === 'team') {
      setSelectedTeams(previousTeams => [
        ...previousTeams,
        teams.find(team => team._id === inputVisibility._id)!,
      ]);
    }

    (typeaheadVisibility.current as any).clear();
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

  const handleNameChange = (
    event: React.FormEvent<FormControl & HTMLInputElement>
  ) => {
    if (!event.currentTarget.value) return;
    event.preventDefault();
    const currentValue = event.currentTarget.value;

    if (project) {
      setProject(
        prevProject =>
          ({
            ...prevProject,
            name: currentValue,
          } as IProject)
      );
    }
  };

  const handleDescriptionChange = (
    event: React.FormEvent<FormControl & HTMLInputElement>
  ) => {
    if (!event.currentTarget.value) return;
    event.preventDefault();
    const currentValue = event.currentTarget.value;

    if (project) {
      setProject(
        prevProject =>
          ({
            ...prevProject,
            description: currentValue,
          } as IProject)
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

  const removeTeamFromSelectedOnes = (teamIdToRemove: string) => {
    const foundIndex = selectedTeams.findIndex(
      team => team._id === teamIdToRemove
    );

    if (foundIndex > -1) {
      let arr = [...selectedTeams];
      arr.splice(foundIndex, 1);
      setSelectedTeams(arr);
    }
  };

  const removePersonFromSelectedOnes = (personIdToRemove: string) => {
    const foundIndex = selectedPeople.findIndex(
      person => person._id === personIdToRemove
    );

    if (foundIndex > -1) {
      let arr = [...selectedPeople];
      arr.splice(foundIndex, 1);
      setSelectedPeople(arr);
    }
  };

  const onClickFinishProjectButton = () => {
    sidebarContext.setSidebarComponent(
      <FinishProject projectId={props.projectId!} />
    );
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
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            className={classNames({
              'is-invalid': errors.name,
            })}
            ref={
              register({
                required: true,
                minLength: 20,
              }) as RBRef
            }
            onChange={handleNameChange}
            value={project?.name}
            autoComplete="off"
            autoCorrect="off"
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            name="name"
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
            value={project?.description}
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
        <Form.Group>
          <Form.Label>Visibilidade</Form.Label>
          <div className="mb-2 add-task-keywords">
            {/* Users that have visibility to this project */}
            {selectedPeople.map((person, index) => (
              <Badge variant="secondary" className="mr-1" key={person._id}>
                {person.emailAddress}{' '}
                <span
                  className="times-icon"
                  onClick={() => removePersonFromSelectedOnes(person._id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </Badge>
            ))}
            {/* Teams that have visibility to this project */}
            {selectedTeams.map((team, index) => (
              <Badge variant="dark" className="mr-1" key={team._id}>
                {team.name}{' '}
                <span
                  className="times-icon"
                  onClick={() => removeTeamFromSelectedOnes(team._id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </Badge>
            ))}
          </div>
          <Typeahead
            ref={typeaheadVisibility as any}
            options={entireVisibility.filter(
              ev => selectedVisibility.findIndex(sv => sv._id === ev._id) === -1
            )}
            labelKey="name"
            id="keywords-typeahead-form"
            emptyLabel="Nenhuma pessoa ou equipe encontrada."
            onChange={handleVisibilityChange}
            renderMenuItemChildren={(option: IVisibility) => (
              <div>
                <small className="text-muted">
                  {option.type === 'person' ? 'Pessoa' : 'Equipe'}
                </small>
                <div>{option.name}</div>
                <small>
                  {option.type === 'person'
                    ? people.find(p => p._id === option._id)?.emailAddress
                    : teams.find(t => t._id === option._id)?.users.length +
                      ' pessoa(s)'}
                </small>
              </div>
            )}
          />
        </Form.Group>
        <Button type="submit" variant="success" block>
          {props.projectId && 'Editar projeto'}
          {!props.projectId && 'Criar projeto'}
        </Button>
        {props.projectId && (
          <Button
            type="button"
            variant="warning"
            block
            onClick={onClickFinishProjectButton}
          >
            Encerrar o projeto
          </Button>
        )}
      </fieldset>
    </Form>
  );
};

export default CreateOrEditProject;
