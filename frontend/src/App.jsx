import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [user, setUser] = useState ({
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
        })
  const [events, setEvents] = useState([])

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
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminPage user={user} events={events} setEvents={setEvents}/>} />
    </Routes>
  )
}

export default App
