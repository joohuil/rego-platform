import { useNavigate } from "react-router"

const LoginPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => navigate("/")}>Log In</button>
        </div>
    )
}

export default LoginPage