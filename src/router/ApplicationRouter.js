/*BEGIN: External Imports */
import {
    HashRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
/*END: External Imports */

/*BEGIN: Page Imports */
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import NewPlaylist from "../pages/NewPlaylist";
import Playlist from "../pages/Playlist";
/*BEGIN: Page Imports */

/*BEGIN: Misc Imports */
import Sidebar from "../misc/Sidebar";
import Notification from "../misc/Notification";
import constants from "../misc/constants";
/*END: Misc Imports */


function ApplicationRouter() {
    return (
        <Router>
            <div className="flex-row align-center container-width">
                {/*Sidebar is consistent in all pages*/}
                <Sidebar />

                {/*Added this so we can show notification just by calling a function*/}
                <Notification />

                <Routes>
                    <Route
                        path={constants.HOME_ROUTE}
                        element={<Home />}
                    />
                    <Route
                        path={constants.NEW_PLAYLIST_ROUTE}
                        element={<NewPlaylist />}
                    />
                    <Route
                        path={constants.PLAYLIST_ROUTE}
                        element={<Playlist />}
                    />
                    <Route
                        path={constants.UPLOAD_ROUTE}
                        element={<Upload />}
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default ApplicationRouter