"use strict";

import * as THREE from "three";
import * as MainLoop from "mainloop.js";
import * as Stats from "stats.js";

class Game {
  constructor() {
    let scene, camera, renderer, geometry, material, cube;

    load();

    MainLoop.setBegin(begin)
      .setUpdate(update)
      .setDraw(draw)
      .setEnd(end)
      .start();

    function load() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      geometry = new THREE.BoxGeometry(1, 1, 1);
      material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;
    }

    function begin(timestamp, delta) {}

    function update(delta) {}

    function draw(interpolationPercentage) {
      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;
      renderer.render(scene, camera);
    }

    function end(fps, panic) {
      if (panic) MainLoop.resetFrameDelta();
    }

    function stats(stats) {
      stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(stats.dom);
    }
  }
}

export default Game;
