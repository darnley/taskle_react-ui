import React from 'react';
import { IUser } from '../../../../interfaces/IUser';
import PersonItem from '../PersonItem';
import { CardDeck } from 'react-bootstrap';
import chunkArray from '../../../../utils/chunkArray';

export interface IPeopleDeck {
  people: IUser[] | undefined;
}

const PeopleDeck: React.FunctionComponent<IPeopleDeck> = props => {
  return (
    <>
      {props.people &&
        chunkArray(props.people).map((people, index) => (
          <CardDeck className="mb-2" key={index}>
            {people.map((person, index, array) => (
              <PersonItem person={person} key={person._id} />
            ))}
          </CardDeck>
        ))}
    </>
  );
};

export default PeopleDeck;
