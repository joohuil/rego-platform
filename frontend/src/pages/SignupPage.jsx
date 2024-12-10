import { useNavigate } from "react-router"
import accountsService from '../services/accounts'

const SignupPage = ({ accounts, setAccounts }) => {
    const navigate = useNavigate()

    const handleSignup = (event) => {
        event.preventDefault()
        console.log(event.target.email.value, event.target.pw.value, event.target.name.value)
        const newUser = {
            email: event.target.email.value,
            password: event.target.pw.value,
            name: event.target.name.value,
            events: []
        }

        console.log(newUser)

        async function signup() {
            await accountsService
                .register(newUser)
                .then(response => {
                    console.log('promise fulfilled register')
                    setAccounts(accounts.concat(response.data))
                    console.log(accounts)
                    navigate("/login")
                })
                .catch (error => {
                    console.log(error)
                })
        }
        signup()
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
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
                <div className="grid grid-cols-5 gap-6">
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
                <div className="grid grid-cols-5 gap-6 py-5">
                    <label 
                        htmlFor="name" 
                        className="col-start-2 col-span-1"
                    >
                        Name: 
                    </label>
                    <input 
                        id="name" 
                        type="text" 
                        required 
                        className="col-start-3 col-span-2"
                    />
                </div>
                <div className="flex flex-row justify-center py-5">
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default SignupPage