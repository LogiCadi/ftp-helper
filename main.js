const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const deploy = require("./deploy");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 640,
    icon: "./favicon32.ico",
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("deploy", async function (event, arg) {
  let logs = [];
  for (let config of arg) {
    const log = await deploy(config);
    logs = logs.concat(log);
  }

  return logs;
});

function about() {
  dialog.showMessageBox({
    message: "一个批量目录上传的小工具\n摆脱多服务器登录和手动拖文件的烦恼",
  });
}

const menu = Menu.buildFromTemplate([
  {
    label: "关于",
    click: about,
  },
]);

Menu.setApplicationMenu(menu);
