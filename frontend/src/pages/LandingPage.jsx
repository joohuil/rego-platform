import { useNavigate } from "react-router"
import EventContainer from '../components/EventContainer'
import UserCard from "../components/UserCard"

const LandingPage = ({ user, setUser }) => {
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
                        <EventContainer user={user}/>
                        <UserCard user={user}/>
                    </div>
                </div>
                : <div>
                    <div className="flex flex-row justify-end">
                        <button onClick={() => navigate("login")}>Log In</button>
                    </div>
                    <EventContainer />
                </div>}
        </div>
        
    )
}

export default LandingPage