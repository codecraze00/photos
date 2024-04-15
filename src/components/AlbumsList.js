import { useFetchAlbumsQuery, useCreateAlbumMutation } from "../store"
import { Skelton } from './Skelton'
import { Button } from './Button'
import { AlbumsListItem } from "./AlbumsListItem"

export const AlbumsList = ({ user }) => {
    const { data, err, isFetching } = useFetchAlbumsQuery(user);
    const [createAlbum, results] = useCreateAlbumMutation()

    const handleAddAlbum = () => createAlbum(user)

    let content;
    if (isFetching)
        content = <Skelton className="h-10 w-full" times={3} />
    else if (err)
        content = <div>Error loading Albums ...</div>
    else {
        content = data.map(album => {
            return <AlbumsListItem key={album.id} album={album} />
        })
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>
                    + Add Album
                </Button>
            </div>
            <div>{content}</div>
        </div>
    )
}