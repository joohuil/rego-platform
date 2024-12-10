import AccountCard from './AccountCard'

const AccountContainer = () => {
    const accounts = [
        {
            id: 1,
            email: "email1",
            name: "name1",
            events: [
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
                }
            ]
        },
        {
            id: 2,
            email: "email2",
            name: "name2",
            events: [
                    {
                    id: 2,
                    name: "Name2",
                    description: "Desc2",
                    date: "Date2"
                }
            ]
        },
        {
            id: 3,
            email: "email3",
            name: "name3",
            events: []
        }
    ]

    return (
        <div className="border-black rounded-xl border-2 px-5 my-5">
            {accounts.map(account => 
                <AccountCard key={account.id} email={account.email} name={account.name} events={account.events}/>
            )}
        </div>
    )
}

export default AccountContainer