import { GoTrashcan } from "react-icons/go"
import { Button } from "./Button"
import { destroyUser } from "../store"
import { useThunk } from "../hooks/use-thunk"
import { ExpandablePanel } from "./ExpandablePanel"
import { AlbumsList } from "./AlbumsList"

export const UsersListItem = ({ user }) => {
    const [doRemoveUser, isDestroyingUser, error] = useThunk(destroyUser)

    const handleClick = () => {
        doRemoveUser(user)
    }

    const header = <>
        <Button className="mr-3" loading={isDestroyingUser} onClick={handleClick}>
            <GoTrashcan />
        </Button>
        {error && <div>Error Deleting User ...</div>}
        {user.name}
    </>
    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}></AlbumsList>
        </ExpandablePanel>
    )
}