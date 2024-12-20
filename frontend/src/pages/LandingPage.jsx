import { useNavigate } from "react-router"
import { useEffect } from 'react'
import EventContainer from '../components/EventContainer'
import UserCard from "../components/UserCard"
import { useToken } from "../contexts/TokenContext";

const LandingPage = ({ user, setUser, events }) => {
    const navigate = useNavigate()
    const { token, setToken } = useToken()

    const handleSignOut = (e) => {
        setUser(null)
        localStorage.setItem("token", null)
        setToken(null)
    }

    useEffect(() => {
        console.log('user when landing page is loaded / user changes', user)
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
                    <div className="pb-20">
                        <h1 className="text-white font-eight text-6xl p-5 pt-14">events</h1>
                        <EventContainer user={user} setUser={setUser} events={events}/>
                    </div>
                    <div className="bg-[#6e8699] m-[-50px] mt-0 p-[50px] pt-10 pb-24">
                        <h1 className="text-white font-eight text-6xl p-5 pt-20">user details</h1>
                        <UserCard user={user} setUser={setUser}/>
                    </div>
                </div>
                : <div>
                    <div className="flex flex-row justify-end">
                        <button onClick={() => navigate("login")}>Log In</button>
                    </div>
                    <section className="flex justify-center items-center h-[100vh] mt-[-90px]">
                        <h1 className="text-white font-eight text-9xl">NZPMC</h1>
                    </section>
                    <div className="bg-[#6e8699] m-[-50px] mt-0 p-[50px] pb-32">
                        <h1 className="text-white font-eight text-6xl p-5 pt-20">events</h1>
                        <EventContainer user={user} setUser={setUser} events={events}/>
                    </div>
                </div>}
        </div>
        
    )
}

export default LandingPage