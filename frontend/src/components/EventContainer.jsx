import EventCard from "./EventCard"

const EventContainer = ({ user, setUser, events}) => {
    return (
        <div className="border-transparent bg-none rounded-xl border-2 px-5 my-5 flex flex-row justify-between flex-wrap">
            {events.map(event => 
                <EventCard 
                    key={`${event.name}-${event.date}`} 
                    name={event.name} 
                    description={event.description} 
                    date={event.date}
                    user={user}
                    setUser={setUser}
                />
            )}
        </div>
    )
}

export default EventContainer