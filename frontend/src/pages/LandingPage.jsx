import { useNavigate } from "react-router"
import { useEffect } from 'react'
import EventContainer from '../components/EventContainer'
import UserCard from "../components/UserCard"

const LandingPage = ({ user, setUser, events }) => {
    console.log('landing p', setUser)
    const navigate = useNavigate()
    const handleSignOut = (e) => {
        setUser(null)
        localStorage.setItem("token", null)
    }

    useEffect(() => {
        console.log('us', user)
        if (user && user.email === "admin@gmail.com") {
            navigate ('/admin')
        } 
    }, [user])

    return (
        <div>
            {
                user 
                ? <div>
                    <div className="flex flex-row justify-end">
                        <button onClick={handleSignOut}>Sign Out</button> 
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <EventContainer user={user} setUser={setUser} events={events}/>
                        <UserCard user={user} setUser={setUser}/>
                    </div>
                </div>
                : <div>
                    <div className="flex flex-row justify-end">
                        <button onClick={() => navigate("login")}>Log In</button>
                    </div>
                    <EventContainer user={user} setUser={setUser} events={events}/>
                </div>}
        </div>
        
    )
}

export default LandingPage