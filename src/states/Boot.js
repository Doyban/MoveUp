/**
 * @class Boot
 * @description Load assets for splash screen.
 * @extends Phaser.State
 */
export default class Boot extends Phaser.State {
  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * @function preload
   * @description Load assets.
   */
  preload() {
    this.load.atlasXML('guisheet', './assets/images/yellowSheet.png', './assets/xml/yellowSheet.xml');
    this.load.audio('background', ['./assets/audio/background.mp3', './assets/audio/background.ogg']);
    this.load.audio('buttonDown', ['./assets/audio/button_down.mp3', './assets/audio/button_down.ogg']);
    this.load.audio('buttonHover', ['./assets/audio/button_hover.mp3', './assets/audio/button_hover.ogg']);
    this.load.audio('buttonJump', ['./assets/audio/jump.mp3', './assets/audio/jump.ogg']);
    this.load.audio('gameOver', ['./assets/audio/game_over.mp3', './assets/audio/game_over.ogg']);
  }

  /**
   * @function create
   * @description Once preload is completed scale the game and start preload state.
   */
  create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.state.start('Preload');
  }
}
