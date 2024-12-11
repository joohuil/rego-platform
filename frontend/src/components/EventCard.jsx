import accountsService from '../services/accounts'

const EventCard = (props) => {
    const { name, description, date, user, setUser } = props

    const handleJoin = () => {
        const editedUser = {
            ...user,
            events: user.events.concat ({
                name: name,
                description: description,
                date: date
            })
        }
        console.log('editedUser', editedUser)

        async function addEvent(editedUser) {
           await accountsService
            .addEvent(user.email, editedUser)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        addEvent(editedUser)
    }

    const isJoined = () => {
        const event = user.events.find (e => e.name === name && e.date === date)
        console.log ('user events', event)
        return event
    }

    return (
        <div className="flex flex-row border-2 border-black rounded-lg w-full p-5 my-5 justify-between">
            <div className="flex flex-col justify-center">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{date}</p>
            </div>
            <div className="flex flex-row h-min self-center">
                {
                    user && user.email !== "admin@gmail.com"
                    ? 
                        <button 
                            onClick={isJoined() ? () => {}: handleJoin} 
                            className={isJoined() ? "disabled text-gray-500 border-gray-500 hover:text-gray-500 hover:border-gray-500 cursor-default" : ""}
                        >
                            {isJoined() ? 'Joined!' : 'Join'}
                        </button>
                    : null
                }
            </div>
        </div>
    )
}

export default EventCard