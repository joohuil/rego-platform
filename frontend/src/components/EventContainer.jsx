import EventCard from "./EventCard"

const EventContainer = ({ user, events }) => {
    return (
        <div className="border-black rounded-xl border-2 px-5 my-5">
            {events.map(event => 
                <EventCard key={event.id} name={event.name} description={event.description} date={event.date}/>
            )}
        </div>
    )
}

export default EventContainer