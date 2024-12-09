import EventCard from "./EventCard"

const EventContainer = ({ user }) => {
    const events = [
        {
            id: 1,
            name: "Name1",
            description: "Desc1",
            date: "Date1"
        },
        {
            id: 2,
            name: "Name2",
            description: "Desc2",
            date: "Date2"
        },
        {
            id: 3,
            name: "Name3",
            description: "Desc3",
            date: "Date3"
        }
    ]

    return (
        <div>
            {events.map(event => 
                <EventCard key={event.id} name={event.name} description={event.description} date={event.date}/>
            )}
        </div>
    )
}

export default EventContainer