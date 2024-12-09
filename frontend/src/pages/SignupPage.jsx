import { useNavigate } from "react-router"

const SignupPage = () => {
    const navigate = useNavigate()

    const handleSignup = (event) => {
        event.preventDefault()
        console.log(event.target.email.value, event.target.pw.value, event.target.name.value)
        navigate("/login")
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" required/>
                </div>
                <div>
                    <label htmlFor="pw">Password: </label>
                    <input id="pw" type="password" required/>
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" required/>
                </div>
                <div>
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default SignupPage