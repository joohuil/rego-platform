import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import accountsService from '../services/accounts'

const LoginPage = ({ user, setUser }) => {
    const navigate = useNavigate()

    useEffect(() => {
        console.log('user when login page is loaded / user changes', user)
        if (user && user.email === "admin@gmail.com") {
            navigate ('/admin')
        } else if (user) {
            navigate ('/')
        }
    }, [user])

    const [errorMessage, setErrorMessage] = useState(null)

    const handleLogin = (event) => {
        event.preventDefault()
        console.log("login request with", event.target.email.value, event.target.pw.value)

        async function login(email, pw) {
            await accountsService
                .login (email, pw)
                .then (response => {
                    const { account, token } = response.data
                    console.log("user, token returned by login", response.data)
                    console.log("user returned by login", account)
                    setUser (account)
                    localStorage.setItem("token", token)
                    console.log('token retrieved from local storage', localStorage.getItem("token"))
                    navigate("/")
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error)
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
            {errorMessage 
                ? <div className="py-5 px-7 m-10 rounded-xl bg-pink-200 justify-self-center">
                    <p>{errorMessage}</p>
                </div>
                : null
            }
        </div>
    )
}

export default LoginPage