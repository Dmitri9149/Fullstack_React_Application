const express = require('express')
const app = express()

let persons = 

{
    "persons":[
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
  }

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
        Phonebook has info for ${persons.persons.length} persons.
      </p>
    </div>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.persons.find(x => x.id == id)
  if (person) {
    res.send(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req,res)=> {
  const id = Number(req.params.id)
  const person = person.person.find(x => x.id != id )
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)