"use strict";

import * as THREE from "three";
import * as MainLoop from "mainloop.js";
import * as Stats from "stats.js";

/*
 * main class that is used to control and render the game in the window
 */
class Game {
  /*
	 * creates our game to be played
	 */
  constructor() {
    // game state for dependency injection
    let state = {};

    // loads the game objects before starting the main loop
    function load(state) {
      if (isDev) createStats(state);

      // our scene to load stuff into and camera to view it
      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera(75, Game.windowX / Game.windowY, 0.1, 1000);

      // create our renderer for the scene
      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(Game.windowX, Game.windowY);
      Game.container.appendChild(renderer.domElement);

      // create cube game object
      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      let cube = new THREE.Mesh(geometry, material);

      // add stuff into our scene
      scene.add(cube);

      // move our camera
      camera.position.z = 5;

      // update the game state with loaded objects
      Object.assign(state, {
        scene,
        camera,
        renderer,
        geometry,
        material,
        cube,
      });
    }

    /*
     * starts the actual game's main loop and configures loop functions
     */
    function start(state) {
      state.mainLoop = MainLoop.setBegin(begin)
        .setUpdate(update)
        .setDraw(draw)
        .setEnd(end)
        .start();
    }

    /*
     * pauses the game and main loop
     */
    function pause() {
      state.mainLoop.stop();
      state.paused = true;
    }

    /*
     * resumes the game from being paused
     */
    function resume() {
      state.mainLoop.start();
      state.paused = false;
    }

    /* 
     * helper function to determin if the game is paused
     */
    function isPaused() {
      return state.paused;
    }

    /*
     * called first before update or draw in our main loop. used to set up
     * the scene for updating
     */
    function begin(timestamp, delta) {
      if (isDev) state.fpsStats.begin();
    }

    /*
     * called every frame, or more for prediciton. used for AI and physics
     */
    function update(delta) {
      if (isDev) state.updateStats.begin();

      // ...code

      if (isDev) state.updateStats.end();
    }

    /*
     * this function is called every frame to render objects
     */
    function draw(interpolationPercentage) {
      if (isDev) state.drawStats.begin();

      state.cube.rotation.x += 0.05;
      state.cube.rotation.y += 0.05;
      state.renderer.render(state.scene, state.camera);

      if (isDev) state.drawStats.end();
    }

    /*
     * the last function called in our main loop. used for cleanup
     */
    function end(fps, panic) {
      if (panic) MainLoop.resetFrameDelta();
      if (isDev) state.fpsStats.end();
    }

    /*
     * creates the dev stats to monitor performance
     */
    function createStats() {
      // calculate our current interpolated fps => update + draw
      let fpsStats = new Stats();
      fpsStats.showPanel(0);
      // fpsStats.dom.style.opacity = "0.69";
      fpsStats.dom.style.position = "absolute";
      fpsStats.dom.style.top = "4px";
      fpsStats.dom.style.left = "4px";
      Game.container.appendChild(fpsStats.dom);

      // calculate the total update time of the game objects
      let updateStats = new Stats();
      updateStats.showPanel(1);
      // updateStats.dom.style.opacity = "0.69";
      updateStats.dom.style.position = "absolute";
      updateStats.dom.style.top = "4px";
      updateStats.dom.style.left = "88px";
      Game.container.appendChild(updateStats.dom);

      // calculate the total draw time of renderer
      let drawStats = new Stats();
      drawStats.showPanel(1);
      // drawStats.dom.style.opacity = "0.69";
      drawStats.dom.style.position = "absolute";
      drawStats.dom.style.top = "4px";
      drawStats.dom.style.left = "172px";
      Game.container.appendChild(drawStats.dom);

      // update the game state
      Object.assign(state, {
        fpsStats,
        updateStats,
        drawStats,
      });
    }

    /*
     * public
     */
    return {
      state: state,
      load: load,
      start: start,
      pause: pause,
      resume: resume,
    };
  }

  /*
   * Global static reference to what we put the game into
   */
  static get container() {
    return document.body;
  }

  /*
   * the horizontal width of our window in pixels
   */
  static get windowX() {
    return window.innerWidth;
  }

  /*
   * the vertical height of our window in pixels
   */
  static get windowY() {
    return window.innerHeight;
  }
}

export default Game;
