import {
  gameWidth,
  gameHeight
} from './helpers/gameConstants.js';
import Boot from './states/Boot.js';
import Main from './states/Main.js';
import Preload from './states/Preload.js';

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

    // Add all states.
    this.state.add('Boot', Boot);
    this.state.add('Main', Main);
    this.state.add('Preload', Preload);

    this.state.start('Boot'); // Start the first state.
  }
}
window.game = new Game();
