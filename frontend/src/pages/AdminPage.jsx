import EventContainer from "../components/EventContainer"
import AccountContainer from "../components/AccountContainer"
import EventForm from "../components/EventForm"
import { useState, useEffect } from 'react'
import accountsService from '../services/accounts'
import { useNavigate } from "react-router"
import { useToken } from "../contexts/TokenContext";
import ViewSelector from "../components/ViewSelector"

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

    // section visibility

    const sections = [
        {
            id: 'eventSection',
            text: "Events",
            handleButtonClick: () => selectSection('eventSection'),
        },
        {
            id: 'accountSection',
            text: "Accounts",
            handleButtonClick: () => selectSection('accountSection'),
        }
    ];

    function selectSection(selectedSection) {
        sections.forEach(section => {
            const sectionElement = document.getElementById(section.id)
            if (section.id === selectedSection) {
                sectionElement.style.display = "block"
            } else {
                sectionElement.style.display = "none"
            }
        })
    }

    return (
        <div>
            <div className="flex flex-row justify-between pb-5">
                <ViewSelector sections={sections}/>
                <button onClick={handleSignOut}>Sign Out</button> 
            </div>

            <section id="eventSection">
                <div className="flex flex-col">
                    <div className="pb-20">
                        <h1 className="text-white font-eight text-6xl p-5 pt-20">events</h1>
                        <EventContainer events={events}/>
                    </div>
                    <div className="bg-indigo-200 m-[-50px] mt-0 p-[50px] pt-6 pb-20">
                        <h1 className="text-white font-eight text-6xl p-5 pt-20">create event</h1>
                        <EventForm events={events} setUser={(u) => {}} setEvents={setEvents} setErrorMessage={setErrorMessage}/>
                        {errorMessage 
                            ? <div className="py-5 px-7 m-10 rounded-xl bg-indigo-200 justify-self-center">
                                <p>{errorMessage}</p>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </section>

            <section id="accountSection" className="hidden">
                <h1 className="text-white font-eight text-6xl p-5 pt-20">accounts</h1>
                <AccountContainer accounts={accounts}/>
            </section>
        </div>
    )
}

export default AdminPage