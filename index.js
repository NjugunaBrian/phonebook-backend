const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const currentDate = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><br/><p>${currentDate}</p>`);
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person  = persons.find(person => person.id === id);
    response.json(person);
})

function generateId() {
    // Generate a random hexadecimal string of length 16
    const randomHex = [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    
    return randomHex;
  }

app.post('/api/persons', (request, response) => {
    let body = request.body

    if(!body.name){
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    if(!body.number){
        return response.status(400).json({
            error:'number is missing'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
        
    }

    persons = persons.concat(person);
    response.json(person);


})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end();
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})