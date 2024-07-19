const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        icon: path.join(__dirname, 'android-chrome-512x512.ico')
    });

    const startUrl = `file://${path.join(__dirname, '../build/index.html')}`;

    console.log('startUrl:', startUrl);

    mainWindow.loadURL(startUrl).catch(err => console.error('Failed to load URL:', err));
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
