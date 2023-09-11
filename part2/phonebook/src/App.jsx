import { useState,useEffect } from "react"
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from "./components/Filter.jsx"
import Notification from "./components/Notification.jsx"
import phoneService from "./services/phoneBookServices.js"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState(null) 

  const [errorMessage, setErrorMessage] = useState(null)
  
const [filtered,setFiltered] = useState([])

const [filter,setFilter] = useState('')

const [newName, setNewName] = useState('')

const [newNumber, setNewNumber] = useState("")

useEffect(() => {
  phoneService.getAll()
  .then(initialValue => {
    setPersons(initialValue)
  })
},[setPersons])


const handleNameChange = (e) => {
    const {value} = e.target
    setNewName(value)
  }

const checkIfPersonExists = (checkPerson) => {
  return persons.find(person => person.name === checkPerson.name)
}


const handleFilter = (e) => {
  const {value} = e.target
  setFilter(value)
  setFiltered(persons.filter(person => person.name.toLowerCase().includes(value.toLowerCase())))
  
}

const handleDelete = (id) => {
  const person = persons.find(person => person.id === id)
  if(window.confirm("Would you like to delete " + person.name + "?")) {
    phoneService.deletePerson(id)
    .then(deletedPerson => {
      console.log("Deleted person:", deletedPerson);
      setPersons(prev => {
        return prev.filter(person => person.id !== id);
      });
    });
  }
  
};

  const handleNumberChange = (e) =>  {
    const {value} = e.target
    setNewNumber(value)
  }


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newPerson = {
      name: newName,
      number: newNumber
    }
  
    const existingPerson = checkIfPersonExists(newPerson);
  
    if (existingPerson) {
      if (window.confirm(`${newPerson.name} is already registered. Would you like to update their number?`)) {
       
        setErrorMessage("You updated: " + newPerson.name)

        setTimeout(() => {
          setErrorMessage(null)
        },5000)

       
       
        phoneService.updatePerson(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
            setNewName("");
            setNewNumber("");


          })
          .catch(error => {
            setErrorMessage(newPerson.name + "is already removed from server")

        setTimeout(() => {
          setErrorMessage(null)
        },3000)
          });
      }
    } else {

      setErrorMessage("You added: " + newPerson.name)

      setTimeout(() => {
        setErrorMessage(null)
      },5000)

      phoneService.create(newPerson)
        .then(newContact => {
          setPersons(persons.concat(newContact));
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          alert(error.response.data);
        });
    }
  }
  

  if(!persons) {
    return null
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={errorMessage} />
     <Filter filter={filter} handleFilter={handleFilter}/>
      

    <h2>add a new</h2>
   <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}
   newName={newName} newNumber={newNumber}
   />

      <h2>Numbers</h2>
      
      {filter === "" ? <Persons persons={persons} handleDelete={handleDelete}/>
       : <Persons persons={filtered} handleDelete={handleDelete}/>}
    </div>
  )
}

export default App