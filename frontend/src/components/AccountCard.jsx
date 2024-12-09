const AccountCard = (props) => {
    const { email, name, events } = props

    return (
        <div>
            <h3>{email}</h3>
            <h3>{name}</h3>
            <ul>
                {events.map(event => <li key={event.id}>{ event.name }</li>)}
            </ul>
        </div>
    )
}

export default AccountCard