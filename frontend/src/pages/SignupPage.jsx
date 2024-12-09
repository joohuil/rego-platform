import { useNavigate } from "react-router"

const SignupPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Sign up</h1>
            <button onClick={() => navigate("/login")}>Create Account</button>
        </div>
    )
}

export default SignupPage