import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useState, useEffect } from 'react'
import eventsService from './services/events'

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
          console.log(events)
        })
        .catch(error => {
          console.log(error.response.data.error)
        })
    }
    getEvents()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} setUser={setUser} events={events}/>} />
      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/admin" element={<AdminPage user={user} events={events} setEvents={setEvents} />} />
    </Routes>
  )
}

export default App
