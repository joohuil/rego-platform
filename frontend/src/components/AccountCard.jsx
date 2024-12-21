import moment from 'moment-timezone'

const AccountCard = (props) => {
    const { email, name, events } = props

    return (
        <div className="flex flex-col justify-start border-2 border-[#8599a9] bg-[#6e8699] rounded-3xl
            hover:bg-[#0b202f] hover:border-white w-[32%] p-10 my-5
            text-white"
        >
            <h3 className='text-xl font-extralight pb-1'>{email}</h3>
            <h3 className='text-3xl font-extrabold'>{name}</h3>
            <br/>
            <ul>
                {events.map(event => 
                    <li key={`${event.name}-${event.date}`}
                        className='pt-2 flex flex-row justify-between'
                    >
                        <p className='font-normal'>{event.name}</p>
                        <p className='font-extralight'>{moment(event.date).tz('Pacific/Auckland').format('YYYY-MM-DD')}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default AccountCard