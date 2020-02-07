const { app, BrowserWindow, ipcMain } = require('electron');
const Storage = require('./storage');

let win;

const storage = new Storage();
const defaultElectronConfig = {
  width: 1280,
  height: 720,
  minWidth: 800,
  minHeight: 600,
  icon: `file://${__dirname}/../dist/Nercadium/assets/logo.jpg`,
  webPreferences: {
    nodeIntegration: true
  },
  frame: false,
  show: false,
  transparent: true
};

function createWindow () {

  // Load the config when exist
  let electronConfig = storage.readData(app.getPath('userData') + '/config', 'electronConfig.json' ,defaultElectronConfig);

  // Create the browser window.
  win = new BrowserWindow(electronConfig);

  // Load buildet index.html
  win.loadURL(`file://${__dirname}/../dist/Nercadium/index.html`);

  win.openDevTools();

  // Window listeners
  // Event when the window is closed.
  win.on('closed', function () {
    win = null;
  });

  // Event when the page is full rendered
  win.on('ready-to-show', () => {
    win.show();
  });

  // Event when the window is resized. Save new window size in electron settings.
  win.on('resize', () => {
    let {width, height, x, y}  = win.getBounds();
    electronConfig.width = width;
    electronConfig.height = height;
    electronConfig.x = x;
    electronConfig.y = y;

    storage.writeData(app.getPath('userData') + '/config','electronConfig.json', electronConfig);
  });
}


// Mainprozess listeners, listen to events send by angular.
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

ipcMain.on('save-data', (event, data) => {
  storage.writeData(data[0].filePath, data[0].fileName, data[0].fileData);
});

ipcMain.handle('load-data', async (event, data) => {
  let loadedData;
  loadedData = await storage.readData(data[0].filePath, data[0].fileName);
  return loadedData;
});

ipcMain.on('rename-data', (event, data) => {
  storage.renameData(data[0].filePath, data[0].oldFileName, data[0].newFileName);
});

ipcMain.on('delete-data', (event, data) => {
  storage.deleteData(data[0].filePath, data[0].fileName);
});

ipcMain.on('append-text', ((event, data) => {
  storage.appendData(data[0].filePath, data[0].fileName, data[0].text);
}));


// App listeners
// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS specific open process
  if (win === null) {
    createWindow();
  }
});
