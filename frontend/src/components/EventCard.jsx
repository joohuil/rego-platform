const EventCard = (props) => {
    const { name, description, date } = props

    return (
        <div>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{date}</p>
        </div>
    )
}

export default EventCard