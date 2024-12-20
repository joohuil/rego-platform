import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import accountsService from '../services/accounts'
import { useToken } from "../contexts/TokenContext";

const LoginPage = ({ user, setUser }) => {
    const navigate = useNavigate()
    const { token, setToken } = useToken()

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
                    setToken(token)
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
        <div className="flex flex-col justify-center items-center">
            {/* [#6e8699] */}
            <div className="border-white border-2 rounded-2xl bg-indigo-300 w-[500px] mt-[7%] text-white flex flex-col items-center">
                <form onSubmit={handleLogin} className="w-[300px] flex flex-col pt-16 pb-5">
                    <label 
                        htmlFor="email" 
                        className="py-2 text-sm"
                    >
                        Email
                    </label>
                    <input 
                        id="email" 
                        type="email" 
                        required 
                        className="mb-2 rounded-2xl"
                    />
                    <label 
                        htmlFor="pw" 
                        className="py-2 text-sm"
                    >
                        Password
                    </label>
                    <input 
                        id="pw" 
                        type="password" 
                        required 
                        className="rounded-2xl"
                    />
                    <div className="flex flex-row justify-center py-5 pt-10">
                        <button type="submit" 
                            className="w-full bg-white text-[#0b202f] border-transparent
                            hover:border-white hover:text-white hover:bg-transparent"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <div className="flex flex-row items-center pt-5 mb-8">
                    <p className="my-5 mr-2 text-sm">Don't have an account?</p>
                    <a className='text-sm underline' href="/signup">Sign up</a>
                </div>
            </div>
            {errorMessage 
                    ? <div className="py-5 px-7 m-10 rounded-xl bg-indigo-200 justify-self-center">
                        <p>{errorMessage}</p>
                    </div>
                    : null
                }
        </div>
    )
}

export default LoginPage