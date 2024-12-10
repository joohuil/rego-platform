import EventContainer from "../components/EventContainer"
import AccountContainer from "../components/AccountContainer"
import EventForm from "../components/EventForm"
import { useState, useEffect } from 'react'
import accountsService from '../services/accounts'

const AdminPage = ({ user, events, setEvents, accounts}) => {
    return (
        <div>
            <h1 className="mb-7">Admin</h1>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2>Events</h2>
                    <EventContainer events={events}/>
                    <h2>Accounts</h2>
                    <AccountContainer accounts={accounts}/>
                </div>
                <EventForm />
            </div>
            
        </div>
    )
}

export default AdminPage