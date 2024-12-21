import eventsService from '../services/events'

const EventForm = ({ events, setEvents, setErrorMessage }) => {

    const handleCreateEvent = (event) => {
        setErrorMessage(null)
        event.preventDefault()
        const newEvent = {
            name: event.target.name.value,
            description: event.target.description.value,
            date: event.target.date.value
        }

        console.log("created event", newEvent)

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
        <div className="flex flex-col border-2 border-[#8599a9] bg-indigo-300 rounded-2xl h-min p-5 my-5 pt-14">
            <form onSubmit={handleCreateEvent} className='text-white'>
                <div className="grid grid-cols-5 gap-6 py-5">
                    <label 
                        htmlFor="name" 
                        className="col-start-2 col-span-1 text-lg pt-2"
                    >
                        Name
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
                        className="col-start-2 col-span-1 text-lg pt-2"
                    >
                        Description
                    </label>
                    <textarea 
                        id="description" 
                        required 
                        className="col-start-3 col-span-2 border-[1px] resize-none py-2 px-4 text-sm"
                    />
                </div>
                <div className="grid grid-cols-5 gap-6 py-5">
                    <label 
                        htmlFor="date" 
                        className="col-start-2 col-span-1 text-lg pt-2"
                    >
                        Date
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