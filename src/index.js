import {
  gameWidth,
  gameHeight
} from './helpers/gameConstants.js';
import Boot from './states/Boot.js';
import Main from './states/Main.js';
import Preload from './states/Preload.js';
import { ShopState } from './states/ShopState.js';

/**
 * @class Game
 * @description Starting point of the game.
 * @extends Phaser.Game
 */
class Game extends Phaser.Game {
  /**
   * @constructor
   */
  constructor() {
    super(gameWidth, gameHeight, Phaser.CANVAS, 'content', null, true); // Create phaser game.

    // Initialize Firebase
    // const config = {
    //   apiKey: "AIzaSyBAIOhzJ5qygFDxxURHRRxdyb9hpEjYdi4",
    //   authDomain: "moveup-fd592.firebaseapp.com",
    //   projectId: "moveup-fd592",
    //   storageBucket: "moveup-fd592.appspot.com",
    //   messagingSenderId: "913523773880",
    //   appId: "1:913523773880:web:44ddca692ec36a8cd7bf4d",
    //   measurementId: "G-8V8K3WE4R3"
    // };
    // firebase.initializeApp(config);

    // Add all states.
    this.state.add('Boot', Boot);
    this.state.add('Main', Main);
    this.state.add('Preload', Preload);
    this.state.add('ShopState', ShopState);

    this.state.start('Boot'); // Start the first state.
  }
}

window.game = new Game();
