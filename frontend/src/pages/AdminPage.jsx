import EventContainer from "../components/EventContainer"
import AccountContainer from "../components/AccountContainer"
import EventForm from "../components/EventForm"
import { useState, useEffect } from 'react'
import accountsService from '../services/accounts'
import { useNavigate } from "react-router"
import { useToken } from "../contexts/TokenContext";

const AdminPage = ({ user, setUser, events, setEvents }) => {
    const { token, setToken } = useToken();
    const navigate = useNavigate()
    useEffect(() => {
        if (user && user.email !== "admin@gmail.com" || localStorage.getItem("token") === 'null') {
            navigate('/')
        }
    }, [user])
    
    const [accounts, setAccounts] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        async function getAccounts() {
            await accountsService
                .getAll()
                .then(response => {
                    console.log('promise fulfilled accounts')
                    console.log('get all accounts', response.data)
                    setAccounts(response.data)
                    console.log('accounts set as state', accounts)
                })
                .catch (error => {
                    console.log(error.response.data.error)
                })
        }
        getAccounts()
    }, [])

    const handleSignOut = (e) => {
        setUser(null)
        localStorage.setItem("token", null)
        setToken(null)
        navigate('/')
    }

    return (
        <div>
            <h1 className="mb-7">Admin</h1>
            <div className="flex flex-row justify-end">
                <button onClick={handleSignOut}>Sign Out</button> 
            </div>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2>Events</h2>
                    <EventContainer events={events}/>
                    <h2>Accounts</h2>
                    <AccountContainer accounts={accounts}/>
                </div>
                <div>
                    <EventForm events={events} setUser={(u) => {}} setEvents={setEvents} setErrorMessage={setErrorMessage}/>
                    {errorMessage 
                        ? <div className="py-5 px-7 m-10 rounded-xl bg-pink-200 justify-self-center">
                            <p>{errorMessage}</p>
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPage