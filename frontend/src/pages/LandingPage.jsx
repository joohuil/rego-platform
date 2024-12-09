import { useNavigate } from "react-router"

const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Landing</h1>
            <button onClick={() => navigate("login")}>Log In</button>
        </div>
        
    )
}

export default LandingPage