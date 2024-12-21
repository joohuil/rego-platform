import AccountCard from './AccountCard'

const AccountContainer = ({ accounts }) => {

    return (
        <div className="border-transparent rounded-xl border-2 px-5 my-5 flex flex-row justify-start flex-wrap gap-[2%]">
            {accounts.map(account => 
                <AccountCard key={account.email} email={account.email} name={account.name} events={account.events}/>
            )}
        </div>
    )
}

export default AccountContainer