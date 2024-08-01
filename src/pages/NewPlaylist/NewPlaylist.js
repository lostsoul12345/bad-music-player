import { Button, Checkbox, CircularProgress, Divider, Grid, IconButton, Paper, styled, TextField } from "@mui/material";
import useGetMusics from "../../hooks/useGetMusics";
import { useMemo, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist, deletePlaylist, updatePlaylist } from "../../redux/state/playlistsReducer";
import { showFailNotification } from "../../redux/state/notificationReducer";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Delete from "@mui/icons-material/Delete";

const NewPlaylistPaper = styled(Paper)(() => ({
    borderRadius: 0,
}));

function NewPlaylist() {
    const Playlists = useSelector(state => state.playlistsReducer);
    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const { musics, loading: loadingGetMusics } = useGetMusics();

    const filteredMusics = useMemo(() => {
        if (search.trim() === "") {
            return musics;
        }
        return musics?.filter(m => m.name.toLowerCase()?.includes(search.toLowerCase()));
    }, [search, musics])

    const onToggleList = (id) => {
        if (list.includes(id)) {
            setList(list?.filter(i => i !== id));
            return;
        }
        setList(prev => [...prev, id]);
    }

    const resetInputs = () => {
        setName("");
        setList([]);
        setSearch("");
    }

    const onCreatePlaylist = () => {
        if (!name) {
            dispatch(showFailNotification("Please provide a name for your Playlist"));
            return;
        }
        if (list.length === 0) {
            dispatch(showFailNotification("No songs selected!"));
            return;
        }
        const nameExists = Playlists.find(p => p.name.toLowerCase() === name.toLowerCase());
        if (nameExists) {
            dispatch(showFailNotification("A playlist with this name already exists"));
            return;
        }
        dispatch(
            createPlaylist(
                name,
                list
            )
        );
        resetInputs();
    }

    const initEdit = (name) => {
        const playlist = Playlists?.find(p => p.name === name);
        setName(playlist.name);
        setList(playlist.list);
        setEditMode(true);
    }

    const cancelEdit = () => {
        setEditMode(false);
        resetInputs();
    }

    const onDeletePlaylist = (name) => {
        dispatch(
            deletePlaylist(name)
        )
    }

    const onUpdatePlaylist = () => {
        dispatch(
            updatePlaylist({ name, list })
        );
        resetInputs();
        setEditMode(false);
    }

    return (
        <NewPlaylistPaper elevation={2} className="flex-row justify-center screen-height container-width">
            <div style={{ overflowY: "auto" }} className="flex-column responsive-width pb-2">
                <h1>
                    {editMode ? "Edit Playlist" : "Create Playlist"}
                </h1>
                <Paper className="flex-row justify-center pt-1 pb-1 gap-2">
                    <div className="responsive-width flex-row justify-between gap-2">
                        <div className="flex-column align-center gap-2">
                            <CreateIcon sx={{ fontSize: "3rem" }} />
                            <TextField
                                className="outlined-textfield"
                                size="small"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                autoComplete="off"
                            />
                            <div className="flex-row align-center gap-1">
                                <Button
                                    onClick={
                                        editMode ? onUpdatePlaylist :
                                            onCreatePlaylist
                                    }
                                    className="contained-button"
                                    variant="contained"
                                >
                                    {
                                        editMode ? "Edit" : "Create"
                                    }
                                </Button>
                                {
                                    editMode &&
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </Button>
                                }
                            </div>
                        </div>
                        {
                            loadingGetMusics ? <CircularProgress /> :
                                <Paper
                                    sx={{ overflowY: "auto", height: 400 }}
                                    elevation={2}
                                    className="flex-row justify-center container-width"
                                >
                                    <div className="responsive-width flex-column pt-1 pb-1 gap-2">
                                        <TextField
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search..."
                                            size="small"
                                            name="song"
                                        />
                                        {
                                            filteredMusics?.length > 0 ?
                                                filteredMusics?.map(m =>
                                                    <div key={m.id} className="flex-row container-width align-center">
                                                        <Checkbox
                                                            checked={list.includes(m.id)}
                                                            onChange={() => onToggleList(m.id)}
                                                            color="secondary"
                                                        />
                                                        <div>
                                                            {m.name}
                                                        </div>
                                                    </div>
                                                ) :
                                                <div>
                                                    No Musics added yet!
                                                </div>
                                        }
                                    </div>
                                </Paper>
                        }
                    </div>
                </Paper>
                <h1>
                    Playlists
                </h1>
                {
                    Playlists?.length === 0 ?
                        <div>
                            No playlists available
                        </div> :
                        <Grid container spacing={1}>
                            {
                                Playlists?.map(p =>
                                    <Grid item xs={12} lg={3} key={p.name}>
                                        <Paper
                                            className="flex-column container-width align-center pt-1"
                                        >
                                            <QueueMusicIcon
                                                color="secondary"
                                                sx={{ fontSize: '4rem' }}
                                            />
                                            <h3>
                                                {p.name}
                                            </h3>
                                            <div className="container-width">
                                                <Divider />
                                            </div>
                                            <div
                                                className="container-width flex-row justify-center align-center gap-1"
                                            >
                                                <div className="container-width flex-row justify-center">
                                                    <IconButton onClick={() => initEdit(p.name)}>
                                                        <CreateIcon />
                                                    </IconButton>
                                                </div>
                                                <div style={{ height: "50px", width: 1 }}>
                                                    <Divider
                                                        sx={{ height: "50px", width: 1 }}
                                                        orientation="vertical"
                                                    />
                                                </div>
                                                <div className="container-width flex-row justify-center">
                                                    <IconButton onClick={() => onDeletePlaylist(p.name)}>
                                                        <Delete />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </Paper>
                                    </Grid>
                                )
                            }
                        </Grid>
                }
            </div>
        </NewPlaylistPaper>
    )
}

export default NewPlaylist