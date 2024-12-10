const UserCard = ({ user }) => {
    const handleEditName = (e) => {
        e.preventDefault()
        console.log(e.target.newName.value)
        e.target.newName.value = ''
    }
    
    return (
        <div className="flex flex-col border-2 border-black rounded-lg w-full justify-between p-7 my-5">
            <div className="grid gap-3">
                <h2>User Details</h2>
                <p>Email: {user.email}</p>
                <p>Name: {user.name}</p>
            </div>
            
            <div>
                <form onSubmit={handleEditName} className="flex flex-row pt-5">
                    <div>
                        <label htmlFor="newName">Name: </label>
                        <input id="newName" type="text" required className="mx-3"/>
                    </div>
                    <div>
                        <button type="submit">Edit Name</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserCard