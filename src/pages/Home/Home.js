import { CircularProgress, Grid, Paper, styled } from "@mui/material";
import useGetMusics from "../../hooks/useGetMusics";
import MusicPlayer from "../../misc/MusicPlayer";
import { useSelector } from "react-redux";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Link } from "react-router-dom";
import constants from "../../misc/constants";

const HomePaper = styled(Paper)(() => ({
    borderRadius: 0,
}));

function Home() {
    const Playlists = useSelector(state => state.playlistsReducer);
    const { musics, loading: loadingGetMusics, getMusics } = useGetMusics();
    return (
        <HomePaper elevation={2} className="flex-row justify-center screen-height container-width">
            <div style={{ overflowY: "auto" }} className="flex-column responsive-width pb-1">
                <h1>Play Lists</h1>
                {
                    Playlists.length === 0 ?
                        <div className="my-1 container-width">
                            No Playlists created yet.
                        </div> :
                        <Grid container spacing={1}>
                            {
                                Playlists.map((p, i) =>
                                    <Grid key={p.name} item xs={12} lg={3}>
                                        <Paper
                                            component={Link}
                                            to={constants.PLAYLIST_ROUTE.replace(":index", i)}
                                            className="flex-column container-width align-center pt-1"
                                        >
                                            <QueueMusicIcon
                                                color="secondary"
                                                sx={{ fontSize: '4rem' }}
                                            />
                                            <h3>
                                                {p.name}
                                            </h3>
                                        </Paper>
                                    </Grid>
                                )
                            }
                        </Grid>
                }
                {loadingGetMusics && <CircularProgress />}
                <MusicPlayer showDelete={true} musics={musics} getMusics={getMusics} />
            </div>
        </HomePaper>
    );
}

export default Home;
