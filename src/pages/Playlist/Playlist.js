import { CircularProgress, Paper, styled } from "@mui/material"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import useGetMusics from "../../hooks/useGetMusics";
import MusicPlayer from "../../misc/MusicPlayer";

const PlaylistPagePaper = styled(Paper)(() => ({
    borderRadius: 0,
}));

function Playlist() {
    const params = useParams();
    const index = useMemo(() => {
        return params?.index || 0
    }, [params]);
    const Playlists = useSelector(state => state.playlistsReducer);
    const playList = useMemo(() => {
        return Playlists[index]
    }, [Playlists, index]);
    const { musics, loading: loadingGetMusics, getMusics } = useGetMusics();
    const filteredMusics = useMemo(() => {
        return musics?.filter(m => playList?.list?.includes(m.id)) || [];
    }, [musics, playList]);
    return (
        <PlaylistPagePaper elevation={2} className="flex-row justify-center screen-height container-width">
            <div style={{ overflowY: "auto" }} className="flex-column responsive-width pb-1">
                <div className="flex-row align-center gap-1">
                    <QueueMusicIcon
                        color="secondary"
                        sx={{ fontSize: '4rem' }}
                    />
                    <h1>
                        {playList?.name}
                    </h1>
                </div>
                {
                    loadingGetMusics ? <CircularProgress /> :
                        <MusicPlayer musics={filteredMusics} getMusics={getMusics} />
                }
            </div>
        </PlaylistPagePaper>
    )
}

export default Playlist