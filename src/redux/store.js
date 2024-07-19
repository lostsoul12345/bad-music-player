import { createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";

import { notificationReducer } from "./state/notificationReducer";
import { volumeReducer } from "./state/volumeReducer";
import { playlistsReducer } from "./state/playlistsReducer";

const persistConfig = {
    key: 'bad-music-player',
    storage,
}

const reducers = combineReducers({
    notificationReducer,
    volumeReducer,
    playlistsReducer
})

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducers)

export const persistor = persistStore(store)