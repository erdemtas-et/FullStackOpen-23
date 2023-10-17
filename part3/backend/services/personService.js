const Contact = require('../models/phonebook')

const create = ({ name, number }) => {

  const person = new Contact({
    name : name,
    number: number
  })
  return person.save()
}

module.exports = { create }