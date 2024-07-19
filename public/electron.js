const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const isDev = process.env.NODE_ENV === 'development';

    console.log('isDev:', isDev);

    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const startUrl = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`;

    console.log('startUrl:', startUrl);

    mainWindow.loadURL(startUrl).catch(err => console.error('Failed to load URL:', err));  // Catch loading errors

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});