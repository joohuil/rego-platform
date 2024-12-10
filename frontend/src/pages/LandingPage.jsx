import { useNavigate } from "react-router"
import EventContainer from '../components/EventContainer'
import UserCard from "../components/UserCard"

const LandingPage = ({ user, setUser, events }) => {
    const navigate = useNavigate()
    const handleSignOut = (e) => {
        setUser(null)
    }

    return (
        <div>
            {
                user 
                ? <div>
                    <div className="flex flex-row justify-end">
                        <button onClick={handleSignOut}>Sign Out</button> 
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <EventContainer user={user} events={events}/>
                        <UserCard user={user} setUser={setUser}/>
                    </div>
                </div>
                : <div>
                    <div className="flex flex-row justify-end">
                        <button onClick={() => navigate("login")}>Log In</button>
                    </div>
                    <EventContainer user={user} events={events}/>
                </div>}
        </div>
        
    )
}

export default LandingPage