const express = require('express')
const app = express()
const url = process.env.MONGODB_URI;

let events = [
    {
      name: "Name1",
      description: "Desc1",
      date: "Date1"
    },
    {
      name: "Name2",
      description: "Desc2",
      date: "Date2"
    },
    {
      name: "Name3",
      description: "Desc3",
      date: "Date3"
    }
  ]
  let accounts = [
        {
            email: "email1",
            password: "1",
            name: "name1",
            events: [
                {
                    name: "Name1",
                    description: "Desc1",
                    date: "Date1"
                }, 
                {
                    name: "Name2",
                    description: "Desc2",
                    date: "Date2"
                }
            ]
        },
        {
            email: "email2",
            password: "2",
            name: "name2",
            events: [
                    {
                    name: "Name2",
                    description: "Desc2",
                    date: "Date2"
                }
            ]
        },
        {
            email: "email3",
            password: "3",
            name: "name3",
            events: []
        }
    ]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

const cors = require('cors')
app.use(cors())

app.get('/api/events', (request, response) => {
    response.json (events)
})

app.post('/api/events', (request, response) => {
    const body = request.body
    console.log(body, 'body')
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    const event = {
        name: body.name,
        description: body.description,
        date: body.date
    }

    const existing = events.find(e => e.name === event.name && e.date === event.date)
    if (existing) {
        return response.status(409).json({
            error: 'this event already exists'
        })
    }

    events = events.concat(event)
    response.json(event)
})

app.get('/api/accounts', (request, response) => {
    // without password field
    response.json (accounts.map (({ password, ...rest }) => rest))
})

app.post('/api/accounts', (request, response) => {
    const body = request.body
    console.log(body, 'body')
    if (!body.email) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const account = {
        email: body.email,
        password: body.password,
        name: body.name,
        events: body.events || []
    }

    const existing = accounts.find(a => a.email === account.email)
    if (existing) {
        return response.status(409).json({
            error: 'an account already exists under this email'
        })
    }

    accounts = accounts.concat(account)
    response.json(account)
})

app.put('/api/accounts/:email', (request, response) => {
    const editedAccount = request.body
    const email = request.params.email
    const user = accounts.find(a => a.email === email)

    if (user) {
        accounts = accounts.map(a => a.email === email ? editedAccount : a)
        response.json(editedAccount)
    } else {
        response.status(404).end()
    }
})

app.post('/api/accounts/login', (request, response) => {
    const body = request.body
    console.log(body)
    const match = accounts.find(a => a.email === body.email && a.password === body.password)
    if (match) {
        response.json(match)
    } else {
        return response.status(401).json({
            error: 'credentials do not match'
        })
    }
})

// const PORT = process.env.PORT || 3001
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})