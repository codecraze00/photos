import { GoTrashcan } from 'react-icons/go'
import { useDestroyAlbumMutation } from "../store"
import { Button } from './Button'
import { ExpandablePanel } from './ExpandablePanel'
import { PhotosList } from './PhotosList'

export const AlbumsListItem = ({ album }) => {
    const [destroyAlbum, destroyAlbumResults] = useDestroyAlbumMutation();
    const handleDestroyAlbum = () => destroyAlbum(album)

    const header = <>
        <Button className='mr-2' onClick={handleDestroyAlbum} loading={destroyAlbumResults.isLoading}>
            <GoTrashcan />
        </Button>
        {album.title}
    </>
    return <ExpandablePanel key={album.key} header={header}>
        <PhotosList album={album} />
    </ExpandablePanel>
} 