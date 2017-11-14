"use strict";

import Game from "./game";

window.isDev = process.env.NODE_ENV !== "production";
window.game = null;

function init() {
  window.game = new Game();
  Game.container.scrollTop = 0;
  Game.container.style.overflow = "hidden";
  Game.container.style.margin = "0px";
}

function run() {
  window.game.load(window.game.state);
  window.game.start(window.game.state);
}

function main() {
  init();
  run();
}

main();
