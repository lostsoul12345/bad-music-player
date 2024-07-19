import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showFailNotification } from "../redux/state/notificationReducer";
import { getAllMusicFiles } from "../database";

function useGetMusics() {
    const [loading, setLoading] = useState(false);
    const [musics, setMusics] = useState(null);
    const dispatch = useDispatch();

    const getMusics = useCallback(async () => {
        setLoading(true);
        try {
            const files = await getAllMusicFiles();
            setMusics(files?.sort((a, b) => a.id - b.id));
        } catch (e) {
            dispatch(showFailNotification("Failed to fetch musics!"))
        }
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        getMusics();
    }, [getMusics]);

    return {
        getMusics,
        loading,
        musics
    }
}

export default useGetMusics