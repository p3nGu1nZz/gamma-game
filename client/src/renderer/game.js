"use strict";

import * as THREE from "three";
import * as MainLoop from "mainloop.js";
import * as Stats from "stats.js";

/*
 * main class that is used to control and render the game in the window
 */
class Game {
  constructor() {
    // game state for dependency injection
    let state = {};

    // load the game's state and start the game using the loaded state
    load(state);
    start(state);

    function load(state) {
      if (isDev) createStats(state);

      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      let cube = new THREE.Mesh(geometry, material);

      scene.add(cube);

      camera.position.z = 5;

      Object.assign(state, {
        scene,
        camera,
        renderer,
        geometry,
        material,
        cube,
      });
    }

    function start(state) {
      state.mainLoop = MainLoop.setBegin(begin)
        .setUpdate(update)
        .setDraw(draw)
        .setEnd(end)
        .start();
    }

    function pause() {
      state.mainLoop.stop();
    }

    function resume() {
      state.mainLoop.start();
    }

    function begin(timestamp, delta) {
      if (isDev) {
        state.fpsStats.begin();
        state.memStats.begin();
      }
    }

    function update(delta) {
      if (isDev) state.updateStats.begin();

      // ...code

      if (isDev) state.updateStats.end();
    }

    function draw(interpolationPercentage) {
      if (isDev) state.drawStats.begin();

      state.cube.rotation.x += 0.1;
      state.cube.rotation.y += 0.1;
      state.renderer.render(state.scene, state.camera);

      if (isDev) state.drawStats.end();
    }

    function end(fps, panic) {
      if (panic) MainLoop.resetFrameDelta();
      if (isDev) {
        state.fpsStats.end();
        state.memStats.end();
      }
    }

    function createStats(config) {
      let fpsStats = new Stats();
      fpsStats.showPanel(0);
      fpsStats.dom.style.opacity = "0.69";
      fpsStats.dom.style.position = "absolute";
      fpsStats.dom.style.top = "4px";
      fpsStats.dom.style.left = "4px";
      document.body.appendChild(fpsStats.dom);
      config.fpsStats = fpsStats;

      let updateStats = new Stats();
      updateStats.showPanel(1);
      updateStats.dom.style.opacity = "0.69";
      updateStats.dom.style.position = "absolute";
      updateStats.dom.style.top = "4px";
      updateStats.dom.style.left = "84px";
      document.body.appendChild(updateStats.dom);
      config.updateStats = updateStats;

      let drawStats = new Stats();
      drawStats.showPanel(1);
      drawStats.dom.style.opacity = "0.69";
      drawStats.dom.style.position = "absolute";
      drawStats.dom.style.top = "4px";
      drawStats.dom.style.left = "168px";
      document.body.appendChild(drawStats.dom);
      config.drawStats = drawStats;

      let memStats = new Stats();
      memStats.showPanel(2);
      memStats.dom.style.opacity = "0.69";
      memStats.dom.style.position = "absolute";
      memStats.dom.style.top = "4px";
      memStats.dom.style.left = "252px";
      document.body.appendChild(memStats.dom);
      config.memStats = memStats;
    }

    //public
    return {
      state: state,
      pause: pause,
      resume: resume,
    };
  }
}

export default Game;
