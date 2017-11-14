"use strict";

import log from "electron-log";
import isDev from "electron-log";
import Game from "./Game";

function main() {
  log.info("[Main] starting game -> Gamma");
  let game = new Game();
}

main();
