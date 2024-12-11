import express from 'express'
const app = express()
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

import Event from './models/event.js'
import Account from './models/account.js'

import requestLogger from './middleware/requestLogger.js'
import unknownEndpoint from './middleware/unknownEndpoint.js'
import errorHandler from './middleware/errorHandler.js'
import authentication from './middleware/authentication.js'
import authorisation from './middleware/authorisation.js'

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

app.get('/api/events', (request, response) => {
    Event.find({}).then(events => {
        response.json(events)
    })
})

app.post('/api/events', authentication, authorisation, async (request, response, next) => {
    const body = request.body

    const event = new Event ({
        name: body.name,
        description: body.description,
        date: body.date
    })

    const query = Event.findOne ({ name: event.name, date: event.date })
    const existing = await query.exec()
    if (existing) {
        return response.status(409).json({
            error: 'This event already exists. Please create a new event.'
        })
    }

    event.save()
        .then(savedEvent => {
            response.json(savedEvent)
        })
        .catch(error => next(error))
})

app.get('/api/accounts', authentication, authorisation, (request, response) => {
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
            error: 'An account already exists under this email.'
        })
    }

    account.save()
        .then(savedAccount => {
            response.json(savedAccount)
        })
        .catch(error => next(error))
})

app.put('/api/accounts/:email', authentication, async (request, response, next) => {
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

app.put('/api/accounts/:email/events', authentication, async (request, response, next) => {
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
    
    const user = await Account.findOne({email: body.email, password: body.password}).exec()
    if (user) {
        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXPIRY }
        )
        response.json({user, token});
    } else {
        return response.status(401).json({
            error: 'This user does not exist or the password is incorrect. Please try again.'
        })
    }
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})