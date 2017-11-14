"use strict";

import { app, BrowserWindow } from "electron";

const isDev = process.env.NODE_ENV !== "production";
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow();
  window.setMenu(null);

  const url = isDev ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}` : `file://${__dirname}/index.html`;

  if (isDev) {
    window.webContents.openDevTools();
  }

  window.loadURL(url);

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) mainWindow = createMainWindow();
});

app.on("ready", () => {
  mainWindow = createMainWindow();
  console.log("Gamma Game Client (Main Process)");
});
