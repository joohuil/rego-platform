const express = require('express')
const app = express()
const url = process.env.MONGODB_URI;

let events = [
    {
      id: 1,
      name: "Name1",
      description: "Desc1",
      date: "Date1"
    },
    {
      id: 2,
      name: "Name2",
      description: "Desc2",
      date: "Date2"
    },
    {
      id: 3,
      name: "Name3",
      description: "Desc3",
      date: "Date3"
    }
  ]
  let accounts = [
        {
            id: 1,
            email: "email1",
            name: "name1",
            events: [
                {
                    id: 1,
                    name: "Name1",
                    description: "Desc1",
                    date: "Date1"
                }, 
                {
                    id: 2,
                    name: "Name2",
                    description: "Desc2",
                    date: "Date2"
                }
            ]
        },
        {
            id: 2,
            email: "email2",
            name: "name2",
            events: [
                    {
                    id: 2,
                    name: "Name2",
                    description: "Desc2",
                    date: "Date2"
                }
            ]
        },
        {
            id: 3,
            email: "email3",
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

app.get('/api/accounts', (request, response) => {
    response.json (accounts)
})

// const PORT = process.env.PORT || 3001
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})