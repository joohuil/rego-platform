import EventContainer from "../components/EventContainer"
import AccountContainer from "../components/AccountContainer"
import EventForm from "../components/EventForm"

const AdminPage = () => {
    return (
        <div>
            <h1 className="mb-7">Admin</h1>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2>Events</h2>
                    <EventContainer />
                    <h2>Accounts</h2>
                    <AccountContainer />
                </div>
                <EventForm />
            </div>
            
        </div>
    )
}

export default AdminPage