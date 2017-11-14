"use strict";

import Game from "./game";

const isDevelopment = process.env.NODE_ENV !== "production";
let g_game = null;

function init() {
  document.body.scrollTop = 0;
  document.body.style.overflow = "hidden";
  document.body.style.margin = "0px";
}

function main() {
  init();
  g_game = new Game();
}

main();
