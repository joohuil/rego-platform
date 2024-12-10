import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import accountsService from './services/accounts'

function App() {
  const [user, setUser] = useState ({
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
        })
  const [events, setEvents] = useState([])
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
      async function getAccounts() {
          await accountsService
              .getAll()
              .then(response => {
                  console.log('promise fulfilled accounts')
                  setAccounts(response.data)
                  console.log(accounts)
              })
              .catch (error => {
                  console.log(error.response.data.error)
              })
      }
      getAccounts()
  }, [])

  useEffect(() => {
    async function getEvents() {
        try {
            const response = await axios
                .get('http://localhost:3001/api/events')
                .then(response => {
                    console.log('promise fulfilled events')
                    setEvents(response.data)
                })
            console.log(events)
        } catch (error){
            console.log(error.response.data.error)
        }
    }
    getEvents()
}, [])

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} setUser={setUser} events={events}/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage accounts={accounts} setAccounts={setAccounts}/>} />
      <Route path="/admin" element={<AdminPage user={user} events={events} setEvents={setEvents} accounts={accounts}/>} />
    </Routes>
  )
}

export default App
