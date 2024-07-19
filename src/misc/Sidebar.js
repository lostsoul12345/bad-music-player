import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, styled, useTheme } from "@mui/material";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Link, useLocation } from "react-router-dom";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import constants from "./constants";

const SidebarPaper = styled(Paper)(() => ({
    borderRadius: 0,
}));

function Sidebar() {
    const theme = useTheme();
    const location = useLocation();
    return (
        <SidebarPaper className="side-bar flex-column align-center">
            <div className="container-width flex-column align-center mt-1 hide-xs">
                <MusicNoteIcon color="primary" sx={{ fontSize: "3rem" }} />
                <h3 style={{ color: theme.palette.primary.main }}>
                    Bad Music Player
                </h3>
            </div>
            <div className="container-width mt-1 hide-xs">
                <Divider />
            </div>
            <nav className="responsive-width flex-column mb-1">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton LinkComponent={Link} to={constants.HOME_ROUTE}>
                            <ListItemIcon>
                                <LibraryMusicIcon
                                    color={location.pathname === constants.HOME_ROUTE ?
                                        "secondary" : undefined}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    color: location.pathname === constants.HOME_ROUTE ?
                                        "secondary" : undefined
                                }}
                                className="hide-xs"
                                primary="Library"
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton LinkComponent={Link} to={constants.NEW_PLAYLIST_ROUTE}>
                            <ListItemIcon>
                                <AddIcon
                                    color={location.pathname === constants.NEW_PLAYLIST_ROUTE ?
                                        "secondary" : undefined}
                                />
                            </ListItemIcon>
                            <ListItemText
                                className="hide-xs"
                                primary="New Playlist"
                                primaryTypographyProps={{
                                    color: location.pathname === constants.NEW_PLAYLIST_ROUTE ?
                                        "secondary" : undefined
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton LinkComponent={Link} to={constants.UPLOAD_ROUTE}>
                            <ListItemIcon>
                                <CloudUploadIcon
                                    color={location.pathname === constants.UPLOAD_ROUTE ?
                                        "secondary" : undefined}
                                />
                            </ListItemIcon>
                            <ListItemText
                                className="hide-xs"
                                primary="Upload"
                                primaryTypographyProps={{
                                    color: location.pathname === constants.UPLOAD_ROUTE ?
                                        "secondary" : undefined
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </SidebarPaper>
    )
}

export default Sidebar