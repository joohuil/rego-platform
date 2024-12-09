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
            <h1>Landing</h1>
            {
                user 
                ? <div>
                    <button onClick={handleSignOut}>Sign Out</button> 
                    <div>
                        <EventContainer user={user}/>
                        <UserCard user={user}/>
                    </div>
                </div>
                : <div>
                    <button onClick={() => navigate("login")}>Log In</button>
                    <EventContainer />
                </div>}
        </div>
        
    )
}

export default LandingPage