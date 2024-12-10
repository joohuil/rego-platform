import { useNavigate } from "react-router"
import accountsService from '../services/accounts'

const LoginPage = ({ setUser }) => {
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()
        console.log(event.target.email.value, event.target.pw.value)

        async function login(email, pw) {
            await accountsService
                .login (email, pw)
                .then (response => {
                    console.log(response.data)
                    setUser (response.data)
                    navigate("/")
                })
                .catch(error => {
                    console.log(error.response.data.error)
                })
        }
        login(event.target.email.value, event.target.pw.value)
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="grid grid-cols-5 gap-6 py-5 pt-[20%]">
                    <label 
                        htmlFor="email" 
                        className="col-start-2 col-span-1"
                    >
                        Email: 
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        required 
                        className="col-start-3 col-span-2"
                    />
                </div>
                <div className="grid grid-cols-5 gap-6 pb-5">
                    <label 
                        htmlFor="pw" 
                        className="col-start-2 col-span-1"
                    >
                        Password: 
                    </label>
                    <input 
                        id="pw" 
                        type="password" 
                        required 
                        className="col-start-3 col-span-2"
                    />
                </div>
                <div className="flex flex-row justify-center py-5">
                    <button type="submit">Log In</button>
                </div>
            </form>
            <div className="flex flex-row justify-center pt-5">
                <p className="my-1 mr-2">Don't have an account?</p>
                <button onClick={() => navigate("/signup")}>Create an Account</button>
            </div>
        </div>
    )
}

export default LoginPage