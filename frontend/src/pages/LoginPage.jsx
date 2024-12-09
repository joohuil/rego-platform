import { useNavigate } from "react-router"

const LoginPage = () => {
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()
        console.log(event.target.email.value, event.target.pw.value)
        navigate("/")
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" required/>
                </div>
                <div>
                    <label htmlFor="pw">Password: </label>
                    <input id="pw" type="password" required/>
                </div>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
            <p>Don't have an account?</p>
            <button onClick={() => navigate("/signup")}>Create an Account</button>
        </div>
    )
}

export default LoginPage