const EventForm = () => {

    const handleCreateEvent = (event) => {
        event.preventDefault()
        console.log(event.target.name.value, event.target.desc.value, event.target.date.value)
        event.target.name.value = ''
        event.target.desc.value = ''
        event.target.date.value = ''
    }

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleCreateEvent}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" required/>
                </div>
                <div>
                    <label htmlFor="desc">Description: </label>
                    <textarea id="desc" required/>
                </div>
                <div>
                    <label htmlFor="date">Date: </label>
                    <input id="date" type="date" required/>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm