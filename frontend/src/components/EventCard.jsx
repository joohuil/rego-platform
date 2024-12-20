import accountsService from '../services/accounts'
import moment from 'moment-timezone';

const EventCard = (props) => {
    const { name, description, date, user, setUser } = props
    const nzDate = moment(date).tz('Pacific/Auckland').format('YYYY-MM-DD HH:mm:ss z');

    const handleJoin = () => {
        const editedUser = {
            ...user,
            events: user.events.concat ({
                name: name,
                description: description,
                date: date
            })
        }
        console.log('edited user with joined events', editedUser)

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
        return event
    }

    return (
        // bg-[#8599a9]
        <div className="flex flex-col border-2 border-solid border-[#8599a9] bg-indigo-300 hover:bg-[#0b202f] hover:border-white hover:border-solid rounded-3xl p-10 my-5 justify-between w-[32%]">
            <div className="flex flex-col justify-start">
                <h3 className='text-white text-4xl font-extrabold'>{name}</h3>
                <br/>
                <p className='text-white text-base'>{description}</p>
                <br/>
                <p className='text-white font-bold text-base'>{nzDate}</p>
            </div>
            <div className="flex flex-row h-min self-end">
                {
                    user && user.email !== "admin@gmail.com"
                    ? 
                        <button 
                            onClick={isJoined() ? () => {}: handleJoin} 
                            className={isJoined() ? "disabled text-[#6e8699] font-medium border-[#6e8699] hover:text-[#6e8699] hover:border-[#6e8699] hover:bg-transparent cursor-default mt-10" 
                            : "hover:border-white hover:text-white border-transparent bg-white hover:bg-transparent text-[#0b202f] font-medium mt-10"}
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