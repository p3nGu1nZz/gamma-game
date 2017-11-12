'use strict';

import Game from "./game";

function init() { 
    document.body.scrollTop = 0;
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0px";
}

function main() {
	init();
	let game = new Game();
}

main();