const SET_VOLUME = "SET_VOLUME";

export function setVolume(volume) {
    return {
        type: SET_VOLUME,
        payload: { volume }
    }
}

const initialState = { volume: 1 }
export function volumeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_VOLUME:
            return action.payload;
        default:
            return state;
    }
}
