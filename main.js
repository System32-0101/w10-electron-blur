const glasstron = require('glasstron');
const { app, ipcMain } = require('electron');

app.commandLine.appendSwitch("enable-transparent-visuals");

let win, isBlurEnabled = true;
const BLUR_TYPE = "blurbehind"; // o "acrylic" --> Puede causar errores en algunas versiones de W10

function createWindow() {
  win = new glasstron.BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false
    }
  });
  updateBlurEffect();

  //Carga del archivo HTML
  win.loadFile('index.html');

  // Controladores IPC
  ipcMain.on('minimize', () => win.minimize());
  ipcMain.on('maximize', () => win.isMaximized() ? win.unmaximize() : win.maximize());
  ipcMain.on('close', () => win.close());

  ipcMain.on("changeTheme", () => {
    isBlurEnabled = !isBlurEnabled;
    updateBlurEffect();
  });
}

function updateBlurEffect() {
  if (isBlurEnabled) {
    win.blurType = BLUR_TYPE;
    win.setBlur(true);

    // truco clave para forzar la actualización
    win.setBackgroundColor('#00000000');
    win.setOpacity(1);
  } else {
    win.setBlur(false);
  }

  // Actualización adicional para Windows
  if (process.platform === 'win32') {
    win.setIgnoreMouseEvents(false);
    win.setHasShadow(false);
    win.setHasShadow(true);
  }
}

app.whenReady().then(() => {
  setTimeout(createWindow, process.platform === "linux" ? 1000 : 0);
});