const UserCard = ({ user }) => {
    const handleEditName = (e) => {
        e.preventDefault()
        console.log(e.target.newName.value)
        e.target.newName.value = ''
    }
    
    return (
        <div>
            <h2>User Details</h2>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            <form onSubmit={handleEditName}>
                <div>
                    <label htmlFor="newName">Name: </label>
                    <input id="newName" type="text" required/>
                </div>
                <div>
                    <button type="submit">Edit Name</button>
                </div>
            </form>
        </div>
    )
}

export default UserCard