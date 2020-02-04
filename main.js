const { app, BrowserWindow, ipcMain } = require('electron');
const Storage = require('./storage');

let win;

const storage = new Storage();
const defaultElectronConfig = {
  width: 1280,
  height: 720,
  backgroundColor: '#ffffff',
  icon: `file://${__dirname}/dist/Nercadium/assets/logo.jpg`,
  webPreferences: {
    nodeIntegration: true
  },
  frame: false,
  applicationMenu: false
};

function createWindow () {

  let electronConfig = storage.readData(app.getPath('userData') + '/config', 'electronConfig.json' ,defaultElectronConfig);

  // Create the browser window.
  win = new BrowserWindow(electronConfig);

  win.loadURL(`file://${__dirname}/dist/Nercadium/index.html`);

  win.webContents.openDevTools();

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  });

  // Event when the window is resized.
  win.on('resize', () => {
    let {width, height}  = win.getBounds();
    electronConfig.width = width;
    electronConfig.height = height;
    storage.writeData(app.getPath('userData') + '/config','electronConfig.json', electronConfig);
  });
}


// Mainprozess listeners
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

ipcMain.on('open-close-devTools', () => {

  if (win.isDevToolsOpened())
    win.closeDevTools();
  else
    win.openDevTools();
});


// App listeners
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
