import React, { useState, useEffect, useMemo, useContext } from 'react';
import { IUser } from '../../../interfaces/IUser';
import { getAllPeople } from '../../../services/people';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddPerson from './AddPerson';
import SidebarContext from '../../../contexts/SidebarContext';
import PeopleDeck from './PeopleDeck';

export interface IPeopleProps {}

const People: React.FunctionComponent<IPeopleProps> = props => {
  const [people, setPeople] = useState<IUser[]>();
  const [peopleList, setPeopleList] = useState<IUser[]>();
  const [searchPeople, setSearchPeople] = useState('');
  const sidebarContext = useContext(SidebarContext);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    getAllPeople().then(people => {
      setPeople(people);
      setPeopleList(people);
    });
  }, [refreshCount]);

  const onPersonAdded = () => {
    sidebarContext.removeSidebarComponent();
    setRefreshCount(refreshCount + 1);
  };

  useMemo(() => {
    if (searchPeople.trim().length > 0) {
      const found = people?.filter(
        person =>
          person.firstName
            ?.toLocaleLowerCase()
            .includes(searchPeople.toLocaleLowerCase()) ||
          person.lastName
            .toLocaleLowerCase()
            .includes(searchPeople.toLocaleLowerCase()) ||
          person.emailAddress
            .toLocaleLowerCase()
            .includes(searchPeople.toLocaleLowerCase())
      );

      setPeopleList(found);
    } else {
      setPeopleList(people);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPeople, people]);

  const handleCreatePersonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sidebarContext.setSidebarComponent(
      <AddPerson onPersonAdded={onPersonAdded} />
    );
  };

  const handlePeopleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    // eslint-disable-next-line eqeqeq
    if (searchPeople != e.currentTarget.value) {
      setSearchPeople(e.currentTarget.value);
    }
  };

  return (
    <>
      <div className="people-header mb-3 d-flex">
        <InputGroup className="mr-3">
          <FormControl
            placeholder="Pesquisa pela pessoa..."
            onChange={handlePeopleSearchChange}
          />
        </InputGroup>
        <span className="float-right">
          <Button className="text-nowrap" onClick={handleCreatePersonClick}>
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Adicionar pessoa
          </Button>
        </span>
      </div>
      <div className="people-list">
        {!peopleList && 'Obtendo dados...'}
        <PeopleDeck people={peopleList} />
      </div>
    </>
  );
};

export default People;
