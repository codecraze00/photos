import { GoTrashcan } from "react-icons/go"
import { useDestroyPhotoMutation } from "../store"

export const PhotosListItem = ({ photo }) => {
    const [destroyPhoto] = useDestroyPhotoMutation();

    const handleDestroyPhoto = () => {
        destroyPhoto(photo)
    }
    return (
        <div onClick={handleDestroyPhoto} className="relative cursor-pointer m-2">
            <img className="h-20 w-20" src={photo.url} alt='random pic' />
            <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80" >
                <GoTrashcan className="text-3xl" />
            </div>
        </div>
    )
}