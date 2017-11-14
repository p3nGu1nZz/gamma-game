"use strict";

import Game from "./game";

window.isDev = process.env.NODE_ENV !== "production";
window.game = null;

function init() {
  document.body.scrollTop = 0;
  document.body.style.overflow = "hidden";
  document.body.style.margin = "0px";
}

function main() {
  init();
  window.game = new Game();
}

main();
