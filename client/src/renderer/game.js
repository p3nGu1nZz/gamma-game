"use strict";

import * as THREE from 'three';
import * as MainLoop from 'mainloop.js'

class Game {
	constructor() {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		camera.position.z = 5;

		MainLoop.setBegin(begin).setUpdate(update).setDraw(draw).setEnd(end).start();
		
		function begin(timestamp, delta) {
		}

		function update(delta) {
		}

		function draw(interpolationPercentage) {
			cube.rotation.x += 0.1;
			cube.rotation.y += 0.1;
			renderer.render(scene, camera);
		}

		function end(fps, panic) {
			if(panic) MainLoop.resetFrameDelta() 
		}
	}
}

export default Game;
