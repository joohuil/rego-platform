const EventForm = () => {

    const handleCreateEvent = (event) => {
        event.preventDefault()
        console.log(event.target.name.value, event.target.desc.value, event.target.date.value)
        event.target.name.value = ''
        event.target.desc.value = ''
        event.target.date.value = ''
    }

    return (
        <div className="flex flex-col border-2 border-black rounded-lg h-min p-5 my-5">
            <h2 className="p-3">Create Event</h2>
            <form onSubmit={handleCreateEvent}>
                <div className="grid grid-cols-5 gap-6 py-5">
                    <label htmlFor="name" className="col-start-2 col-span-1">Name: </label>
                    <input id="name" type="text" required className="col-start-3 col-span-2"/>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    <label htmlFor="desc" className="col-start-2 col-span-1">Description: </label>
                    <textarea id="desc" required className="col-start-3 col-span-2 border-[1px] rounded border-black resize-none"/>
                </div>
                <div className="grid grid-cols-5 gap-6 py-5">
                    <label htmlFor="date" className="col-start-2 col-span-1">Date: </label>
                    <input id="date" type="date" required className="col-start-3 col-span-2"/>
                </div>
                <div className="flex flex-row justify-center py-5">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm