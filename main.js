const { app, BrowserWindow, ipcMain } = require('electron');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${__dirname}/dist/Nercadium/index.html`);

  // uncomment below to open the DevTools.
  win.webContents.openDevTools();

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  });
}


//Mainprozess listeners
ipcMain.on('close-window', () => {
  win.close();
});

ipcMain.on('minimize-window', () => {
  win.minimize();
});

ipcMain.on('maximize-window', () => {
  win.maximize();
});

ipcMain.on('unmaximize-window', () => {
  win.unmaximize();
});


// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
});
