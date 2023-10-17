require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const personService = require('./services/personService')
const Contact = require('./models/phonebook')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan('tiny'))

// all persons
app.get('/api/persons',(request,response) => {
  Contact.find({}).then(persons => {
    response.json(persons)
  })
})

//delete a person
app.delete('/api/persons/:id',(request,response,next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})


//single person
app.get('/api/persons/:id',(request,response,next) => {
  Contact.findById(request.params.id).then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})



// info page
app.get('/info', (request, response) => {
  const date = new Date()
  Contact.count({}).
    then(result => {
      response.send(`<p>Phonebook has info for ${result} people</p>
    <p>${date.toString()}</p>`)
    })


})


// add a new person
app.post('/api/persons',(request,response,next) => {
  const { name,number } = request.body

  personService.create({ name,number })
    .then(createdPerson => {
      response.json(createdPerson)
    })
    .catch(error => {
      next(error)
    })
})

//update person
app.put('/api/persons/:id',(request,response,next) => {
  const { name,number } = request.body

  Contact.findByIdAndUpdate(request.params.id, { name,number }, { new: true, runValidators: true,context : 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})