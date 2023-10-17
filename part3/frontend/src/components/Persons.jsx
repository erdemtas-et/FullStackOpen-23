import React from 'react';
import Person from './Person';

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
        <Person  handleDelete={handleDelete} person={person} />
        </div>
      ))}
      </>
  );
};

export default Persons;