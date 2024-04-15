import { useEffect } from "react"
import { useSelector } from "react-redux"
import { fetchUsers, addUser } from "../store";
import { Skelton } from "./Skelton";
import { Button } from './Button'
import { useThunk } from "../hooks/use-thunk";
import { UsersListItem } from "./UsersListItem";

export const UsersList = () => {
    const [doFetchUsers, isLoadingUser, loadingUserError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserErr] = useThunk(addUser);

    const { list } = useSelector((state) => state.users)

    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers])

    const handleUserAdd = () => {
        doCreateUser()
    }

    let content;
    if (isLoadingUser) {
        content = <Skelton times={6} className="h-10 w-full">Loading ...</Skelton>
    } else if (loadingUserError) {
        content = <div>Error Fetching Data !!</div>
    } else {
        content = list.map(user => {
            return <UsersListItem key={user.id} user={user} />
        })

    }

    return <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            < Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User </Button>
            {creatingUserErr && 'Error Creating User...'}
        </div>
        {content}
    </div >
}