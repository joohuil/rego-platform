const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Event = require('./models/event')
const Account = require('./models/account')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }

    next(error)
}

// let events = [
//     {
//       name: "Name1",
//       description: "Desc1",
//       date: "Date1"
//     },
//     {
//       name: "Name2",
//       description: "Desc2",
//       date: "Date2"
//     },
//     {
//       name: "Name3",
//       description: "Desc3",
//       date: "Date3"
//     }
//   ]
//   let accounts = [
//         {
//             email: "email1",
//             password: "1",
//             name: "name1",
//             events: [
//                 {
//                     name: "Name1",
//                     description: "Desc1",
//                     date: "Date1"
//                 }, 
//                 {
//                     name: "Name2",
//                     description: "Desc2",
//                     date: "Date2"
//                 }
//             ]
//         },
//         {
//             email: "email2",
//             password: "2",
//             name: "name2",
//             events: [
//                     {
//                     name: "Name2",
//                     description: "Desc2",
//                     date: "Date2"
//                 }
//             ]
//         },
//         {
//             email: "email3",
//             password: "3",
//             name: "name3",
//             events: []
//         }
//     ]

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

app.get('/api/events', (request, response) => {
    Event.find({}).then(events => {
        response.json(events)
    })
})

app.post('/api/events', async (request, response, next) => {
    const body = request.body

    const event = new Event ({
        name: body.name,
        description: body.description,
        date: body.date
    })

    const query = Event.findOne ({ name: event.name, date: event.date})
    const existing = await query.exec()
    if (existing) {
        return response.status(409).json({
            error: 'this event already exists'
        })
    }

    event.save()
        .then(savedEvent => {
            response.json(savedEvent)
        })
        .catch(error => next(error))
})

app.get('/api/accounts', (request, response) => {
    // without password field
    Account.find({}).then(accounts => {
        response.json(accounts)
    })
})

app.post('/api/accounts', async (request, response, next) => {
    const body = request.body
    console.log(body, 'body')
    if (!body.email) {
        return response.status(400).json({
            error: 'email missing'
        })
    }

    const account = new Account ({
        email: body.email,
        password: body.password,
        name: body.name,
        events: body.events || []
    })

    const query = Account.findOne ({ email: account.email })
    const existing = await query.exec()

    if (existing) {
        return response.status(409).json({
            error: 'an account already exists under this email'
        })
    }

    account.save()
        .then(savedAccount => {
            response.json(savedAccount)
        })
        .catch(error => next(error))
})

app.put('/api/accounts/:email', async (request, response, next) => {
    const editedAccount = request.body
    console.log(editedAccount)
    const email = request.params.email

    Account.findOne ({ email: email })
        .then(async user => {
            if (user) {
                user.name = editedAccount.name
                await user.save()
                response.json(editedAccount)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/accounts/:email/events', async (request, response, next) => {
    const editedAccount = request.body
    console.log(editedAccount)
    const email = request.params.email

    Account.findOne ({ email: email })
        .then(async user => {
            if (user) {
                user.events = editedAccount.events
                await user.save()
                response.json(editedAccount)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/accounts/login', async (request, response) => {
    const body = request.body
    
    const match = await Account.findOne({email: body.email, password: body.password}).exec()
    if (match) {
        response.json(match)
    } else {
        return response.status(401).json({
            error: 'credentials do not match'
        })
    }
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})