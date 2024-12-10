import AccountCard from './AccountCard'

const AccountContainer = ({ accounts }) => {

    return (
        <div className="border-black rounded-xl border-2 px-5 my-5">
            {accounts.map(account => 
                <AccountCard key={account.email} email={account.email} name={account.name} events={account.events}/>
            )}
        </div>
    )
}

export default AccountContainer