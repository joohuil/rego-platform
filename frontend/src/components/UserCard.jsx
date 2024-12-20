import accountsService from '../services/accounts'

const UserCard = ({ user, setUser }) => {
    const handleEditName = (e) => {
        e.preventDefault()
        console.log("name to change to", e.target.newName.value)
        const updatedUser = {
            ...user,
            name: e.target.newName.value
        }
        console.log('updated user with new name, to pass through', updatedUser)

        async function editName (updatedUser) {
            await accountsService
                .update(user.email, updatedUser)
                .then(response => {
                    console.log('promise fulfilled edit')
                    setUser(response.data)
                    console.log('updated user with new name returned', response.data)
                    e.target.newName.value = ''
                })
                .catch (error => {
                    console.log(error.response.data.error)
                })
        }
        editName (updatedUser)
    }
    
    return (
        <div className="flex flex-col border-2 border-transparent rounded-xl w-full justify-between px-10 my-5">
            <div className="grid gap-3 text-white text-lg pb-5">
                <p><b>Email:</b> {user.email}</p>
                <p><b>Name:</b> {user.name}</p>
            </div>
            
            <div>
                <form onSubmit={handleEditName} className="flex flex-col pt-5">
                    <div>
                        <label htmlFor="newName" className='text-white font-semibold'>New name: </label>
                    </div>
                    <div>
                        <input id="newName" type="text" required className="mr-3 ml-[-15px] mt-5"/>
                        <button type="submit">Edit Name</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserCard