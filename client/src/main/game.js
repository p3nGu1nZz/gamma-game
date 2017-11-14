"use strict";

import util from "util";
import log from "electron-log";
import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import platform from "electron-platform";
import windowStateKeeper from "electron-window-state";

class Game {
  constructor() {
    if (isDev) {
      require("electron-debug")({ showDevTools: false });
    }

    let state = {};

    let gameWindow,
      defaultWindowSize = {
        x: 1024,
        y: 720,
      };

    createListeners();

    function createWindow() {
      log.info(`[Game] creating game window -> ${Game.inspect(defaultWindowSize)}`);

      let gameWindowState = windowStateKeeper({
        defaultWidth: defaultWindowSize.x,
        defaultHeight: defaultWindowSize.y,
        maximize: true,
        fullscreen: true,
      });

      log.info(`[Game] created game state -> ${Game.inspect(gameWindowState)}`);

      let window = new BrowserWindow({
        x: gameWindowState.x,
        y: gameWindowState.y,
        width: gameWindowState.width,
        height: gameWindowState.height,
        show: false,
        backgroundColor: "#000000",
        fullscreenable: true,
        webPreferences: { devTools: isDev, toolbar: false },
      });

      window.setMenu(null);

      log.info(`[Game] created window -> ${Game.inspect(window)}`);

      gameWindowState.manage(window);

      const url = isDev
        ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
        : `file://${__dirname}/index.html`;

      // if (isDev) {
      //   window.webContents.openDevTools();
      // }

      log.info(`[Game] load window content -> ${url}`);

      window.loadURL(url);

      window.on("ready-to-show", () => {
        log.info(`[Game] ready to show window`);
        gameWindow.show();
        gameWindow.focus();
        // gameWindow.openDevTools({ detach: true });
        log.info(`[Game] game created! -> let's play :)`);
      });

      window.on("closed", () => {
        log.info(`[Game] window closed`);
        gameWindow = null;
      });

      // if (isDev) {
      //   window.webContents.on("devtools-opened", () => {
      //     log.info(`[Game] dev tools opened`);
      //     window.focus();
      //     setImmediate(() => {
      //       window.focus();
      //     });
      //     // require("devtron").install();
      //   });
      // }

      return window;
    }

    function createListeners() {
      app.on("window-all-closed", () => {
        log.info(`[Game] all windows closed -> quite`);
        if (platform.isDarwin) app.quit();
      });

      app.on("activate", () => {
        log.info(`[Game] game activate -> create window?`);
        if (gameWindow === null) {
          log.info(`[Game] no window -> create new window?`);
          gameWindow = createWindow();
        }
      });

      app.on("ready", () => {
        log.info(`[Game] app ready -> create window`);
        gameWindow = createWindow();
      });
    }
  }

  /*
   * shortcut helper link to a baked util.inspect
   */
  static inspect(object) {
    return util.inspect(object, {
      showHidden: true,
      depth: null,
      colors: true,
      showProxy: true,
      maxArrayLength: null,
      breakLength: 80,
    });
  }
}

export default Game;
