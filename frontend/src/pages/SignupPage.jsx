import { useNavigate } from "react-router"
import { useState } from "react"
import accountsService from '../services/accounts'

const SignupPage = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSignup = (event) => {
        event.preventDefault()
        console.log("sign up request with", event.target.email.value, event.target.pw.value, event.target.name.value)
        const newUser = {
            email: event.target.email.value,
            password: event.target.pw.value,
            name: event.target.name.value,
            events: []
        }

        console.log("new user to pass through sign up", newUser)

        async function signup() {
            await accountsService
                .register(newUser)
                .then(response => {
                    console.log('promise fulfilled register')
                    navigate("/login")
                })
                .catch (error => {
                    setErrorMessage(error.response.data.error)
                })
        }
        signup()
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="border-white border-2 rounded-2xl bg-[#6e8699] w-[500px] mt-[7%] text-white flex flex-col items-center">
                <form onSubmit={handleSignup} className="w-[300px] flex flex-col pt-14 pb-5">
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
                        className="mb-2 rounded-2xl"
                    />
                    <label 
                        htmlFor="name" 
                        className="py-2 text-sm"
                    >
                        Name
                    </label>
                    <input 
                        id="name" 
                        type="text" 
                        required 
                        className="mb-2 rounded-2xl"
                    />
                    <div className="flex flex-row justify-center py-10 pb-12">
                        <button type="submit" 
                            className="w-full bg-white text-[#0b202f] border-transparent
                            hover:border-white hover:text-white hover:bg-transparent"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
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

export default SignupPage