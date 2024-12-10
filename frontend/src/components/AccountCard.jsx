const AccountCard = (props) => {
    const { email, name, events } = props

    return (
        <div className="flex flex-col border-2 border-black rounded-lg w-full justify-center p-5 my-5">
            <h3>{email}</h3>
            <h3>{name}</h3>
            <ul>
                {events.map(event => <li key={`${event.name}-${event.date}`}>{ event.name }</li>)}
            </ul>
        </div>
    )
}

export default AccountCard