"use strict";

import Game from "./game";

// global variables =? all functions can access
window.isDev = process.env.NODE_ENV !== "production";
window.game = null;

/*
 * our function that is used to setup the window
 */
function init() {
  window.game = new Game();
  Game.container.scrollTop = 0;
  Game.container.style.overflow = "hidden";
  Game.container.style.margin = "0px";
}

/*
 * used to run a game in the window
 */
function start() {
  window.game.load(window.game.state);
  window.game.run(window.game.state);
}

/*
 * entry point for game
 */
function main() {
  init();
  start();
}

// do it!!!
main();
