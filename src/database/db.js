import { openDB } from 'idb';

const DB_NAME = 'bad-music-player-db';
const DB_VERSION = 1;
const MUSIC_STORE_NAME = 'music-files';

const initDB = async () => {
    const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(MUSIC_STORE_NAME)) {
                db.createObjectStore(MUSIC_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
    return db;
};

export const addMusicFile = async (file) => {
    const db = await initDB();
    const tx = db.transaction(MUSIC_STORE_NAME, 'readwrite');
    await tx.store.add({ file, name: file.name });
    await tx.done;
};

export const getAllMusicFiles = async () => {
    const db = await initDB();
    return await db.getAll(MUSIC_STORE_NAME);
};

export const deleteMusicFile = async (id) => {
    const db = await initDB();
    const tx = db.transaction(MUSIC_STORE_NAME, 'readwrite');
    await tx.store.delete(id);
    await tx.done;
};