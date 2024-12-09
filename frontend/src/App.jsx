import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useState } from 'react'

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

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} setUser={setUser}/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminPage user={user}/>} />
    </Routes>
  )
}

export default App
