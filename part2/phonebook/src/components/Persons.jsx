import React from 'react'
import Person from './Person'

const Persons = ({persons, handleDelete}) => {
  return (
    <>
    {persons.map(person => {
   return <Person key={person.id} handleDelete={handleDelete} person={person} />
    })}
    </>
  )
}

export default Persons