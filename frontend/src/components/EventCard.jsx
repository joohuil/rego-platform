const EventCard = (props) => {
    const { name, description, date } = props

    return (
        <div className="flex flex-col border-2 border-black rounded-lg w-full justify-center p-5 my-5">
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{date}</p>
        </div>
    )
}

export default EventCard