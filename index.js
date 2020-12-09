const express = require('express')
const app = express()

app.use(express.json())

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

const getRandomInt = max => 
  Math.floor(Math.random() * Math.floor(max))
const maxId = 1000000

app.get('/', (request, response) =>  {
    response.send('<h1>Hello from Server</h1>')
}
)

app.get('/api/persons', (request, response) => {
    response.json(persons)
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

app.post('/api/persons', (req,res) => {
  const person = req.body
  person.id = getRandomInt(maxInt)
  persons.concat(person)
  res.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)