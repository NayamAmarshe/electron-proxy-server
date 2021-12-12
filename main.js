const { app, BrowserWindow, ipcMain } = require("electron");

// Global Environment Variables
process.env.NODE_ENV = "development";
const isDev = process.env.NODE_ENV !== "production" ? true : false;
const PORT = 8080;

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    resizable: isDev ? true : false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.removeMenu();
  window.loadFile("./frontend/index.html");

  const hiddenWindow = new BrowserWindow({
    width: 600,
    height: 800,
    x: 800,
    y: 0,
    resizable: isDev ? true : false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: isDev ? true : false,
  });
  hiddenWindow.removeMenu();
  hiddenWindow.loadFile("./frontend/requests.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Calls
ipcMain.on("get-port", (event, data) => {
  event.reply("send-port", PORT);
});
