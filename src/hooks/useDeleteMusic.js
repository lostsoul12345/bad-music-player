import { useDispatch } from "react-redux";
import { deleteMusicFile } from "../database";
import { showFailNotification, showSuccessNotification } from "../redux/state/notificationReducer";
import { useState } from "react";

function useDeleteMusic() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const deleteMusic = async (id, callback) => {
        setLoading(true);
        try {
            await deleteMusicFile(id);
            dispatch(showSuccessNotification("Music deleted!"));
            callback();
        } catch (e) {
            dispatch(showFailNotification("failed to delete music"));
        }
        setLoading(false);
    }

    return {
        deleteMusic,
        loading
    }
}

export default useDeleteMusic