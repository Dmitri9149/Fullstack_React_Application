require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

app.use(bodyParser.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

app.use(cors())

app.use(express.static('build'))

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  },
  { 
    "name": "Mary ", 
    "number": "39-23-6423122",
    "id": 5
  }      
]

const getRandomInt = () => 
  Math.floor(Math.random() * Math.floor(maxId))
const maxId = 1000000000

app.get('/', (request, response) =>  {
    response.send('<h1>Hello from Server</h1>')
}
)

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)})
})

app.get('/info', (request, response) => {
  response.send(`
    <div>
      <p>
      ${new Date().toString()}
      </p>
      <p>
        Phonebook has info for ${persons.length} persons.
      </p>
    </div>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(x => x.id == id)
  if (person) {
    res.send(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request,response) => {
  const person = request.body
// no name or number -> error
  if(!person.name || !person.number) {
    return response.status(400).json({
      error:'name or number missed'
    })
  }
// name already exist -> error
  const inclName = (persons.map( x => x.name).includes(person.name))
  if (inclName) {
    return response.status(400).json({
      error: 'the name already exist'
    })
  }


  person.id = getRandomInt()
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})