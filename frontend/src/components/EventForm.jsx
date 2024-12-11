import eventsService from '../services/events'

const EventForm = ({ events, setEvents, setErrorMessage }) => {

    const handleCreateEvent = (event) => {
        setErrorMessage(null)
        event.preventDefault()
        console.log(event.target.name.value, event.target.description.value, event.target.date.value)
        const newEvent = {
            name: event.target.name.value,
            description: event.target.description.value,
            date: event.target.date.value
        }

        console.log(newEvent)

        async function createEvent() {
            await eventsService
                .create(newEvent)
                .then(response => {
                    console.log('promise fulfilled create')
                    event.target.name.value = ''
                    event.target.description.value = ''
                    event.target.date.value = ''
                    setEvents(events.concat(newEvent))
                })
                .catch (error => {
                    setErrorMessage(error.response.data.error)
                })
        }
        createEvent()
    }

    return (
        <div className="flex flex-col border-2 border-black rounded-lg h-min p-5 my-5">
            <h2 className="p-3">Create Event</h2>
            <form onSubmit={handleCreateEvent}>
                <div className="grid grid-cols-5 gap-6 py-5">
                    <label 
                        htmlFor="name" 
                        className="col-start-2 col-span-1"
                    >
                        Name: 
                    </label>
                    <input 
                        id="name" 
                        type="text" 
                        required 
                        className="col-start-3 col-span-2"
                    />
                </div>
                <div className="grid grid-cols-5 gap-6">
                    <label 
                        htmlFor="description" 
                        className="col-start-2 col-span-1"
                    >
                        Description: 
                    </label>
                    <textarea 
                        id="description" 
                        required 
                        className="col-start-3 col-span-2 border-[1px] rounded border-black resize-none border-solid py-[7px] px-[10px] text-sm"
                    />
                </div>
                <div className="grid grid-cols-5 gap-6 py-5">
                    <label 
                        htmlFor="date" 
                        className="col-start-2 col-span-1"
                    >
                        Date: 
                    </label>
                    <input 
                        id="date" 
                        type="date" 
                        required 
                        className="col-start-3 col-span-2"
                    />
                </div>
                <div className="flex flex-row justify-center py-5">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default EventForm