const CREATE_PLAYLIST = "CREATE_PLAYLIST";
const DELETE_PLAYLIST = "DELETE_PLAYLIST";
const UPDATE_PLAYLIST = "UPDATE_PLAYLIST";

export function createPlaylist(name, list) {
    return {
        type: CREATE_PLAYLIST,
        payload: { name, list }//list is an array of ids
    }
}

export function deletePlaylist(name) {
    return {
        type: DELETE_PLAYLIST,
        payload: { name }
    }
}

export function updatePlaylist(playlist) {
    return {
        type: UPDATE_PLAYLIST,
        payload: playlist
    }
}

const initialState = [];
export function playlistsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PLAYLIST:
            return [...state, action.payload];
        case DELETE_PLAYLIST:
            return state.filter(s => s.name !== action.payload.name);
        case UPDATE_PLAYLIST:
            const updatedPlaylist = state.map(s => {
                if (s.name === action.payload.name) {
                    return action.payload;
                }
                return s;
            });
            return updatedPlaylist;
        default:
            return state;
    }
}
