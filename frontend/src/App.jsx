import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useState, useEffect } from 'react'
import eventsService from './services/events'
import accountsService from './services/accounts'

function App() {
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState([])
      
  useEffect(() => {
    async function getEvents() {
      await eventsService
        .getAll()
        .then(response => {
          console.log('promise fulfilled events')
          setEvents(response.data)
        })
        .catch(error => {
          console.log(error.response.data.error)
        })
    }
    getEvents()
  }, [])

  function getEmailFromToken(parts) {
    try {
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      console.log("payload", payload.sub)
      return payload.sub
    } catch (error) {
      console.error('Failed to extract email:', error.message)
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const parts = token.split('.')
      console.log("token in App during useEffect", parts)
      if (parts.length === 3) {
        const decodedToken = getEmailFromToken(parts)
        console.log('decoded token', decodedToken)
        async function getUser() {
          await accountsService
            .get(decodedToken)
            .then(response => {
              setUser(response.data)
              console.log("email from token", response.data)
            })
            .catch(error => {
              console.log(error.response)
            })
            console.log(user, ": user from decoded token")
        }
        getUser()
      }
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} setUser={setUser} events={events}/>} />
      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/admin" element={<AdminPage user={user} setUser={setUser} events={events} setEvents={setEvents} />} />
    </Routes>
  )
}

export default App
