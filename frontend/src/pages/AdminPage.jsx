import EventContainer from "../components/EventContainer"
import AccountContainer from "../components/AccountContainer"
import EventForm from "../components/EventForm"

const AdminPage = () => {
    return (
        <div>
            <h1>Admin</h1>
            <h2>Events</h2>
            <EventContainer />
            <h2>Accounts</h2>
            <AccountContainer />
            <EventForm />
        </div>
    )
}

export default AdminPage