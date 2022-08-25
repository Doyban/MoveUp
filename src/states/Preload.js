import {
  styleForPlayText, styleForTitleText
} from '../helpers/gameConstants';

export const UI_SCALE_FACTOR = 2;

/**
 * @class Preload
 * @description Preload necessary assets and create basic graphics to start the game.
 * @extends Phaser.State
 */
export default class Preload extends Phaser.State {
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
    this.load.atlas('dpad', './assets/images/dpad.png', './assets/json/dpad.json');
    this.load.atlasJSONHash('player', './assets/spritesheets/player.png', './assets/json/playerDataMoveUp.json');
    this.load.image('gameOverBackground', './assets/images/gameOverBackground.png');
    this.load.image('gameBackgroundTile', './assets/images/gameBackgroundTile.png');
    this.load.image('retryButton', './assets/images/retryButton.png');
    this.load.image('tile', './assets/images/tile.png');
    this.load.image('musicoff', './assets/images/musicOff.png');
    this.load.image('musicon', './assets/images/musicOn.png');
    this.load.image('transparentBackground', './assets/images/transparentBackground.png');
  }

  /**
   * @function create
   * @description Once preload is completed start creating necessary game elements.
   */
  create() {
    let background = []; // Variable to store background tile data.

    // Get exact width and height of the tile.
    let tileWidth = this.cache.getImage('gameBackgroundTile').width;
    let tileHeight = this.cache.getImage('gameBackgroundTile').height;

    // Create background with tile images.
    for (let i = 0; i < this.game.width; i += tileWidth) {
      for (let j = 0; j < this.game.height; j += tileHeight) {
        background.push(this.add.image(i, j, 'gameBackgroundTile'));
      }
    }
    this.backgroundTiles = background;

    // Add and create necessary assets.
    this.addAudioFiles();
    this.createPlayButton();
    this.createPlayText();
    this.createUiButtons();
    this.createTitleText();
  }

  /**
   * @function addAudioFiles
   * @description Add audio files.
   */
  addAudioFiles() {
    this.buttonDownAudio = this.add.audio('buttonDown', 1, false);
    this.buttonHoverAudio = this.add.audio('buttonHover', 1, false);
  }

  /**
   * @function createPlayButton
   * @description Create play button.
   */
  createPlayButton() {
    let playButton = this.add.button(this.world.centerX, this.world.centerY, 'guisheet', this._onPlayButton, this, 'yellow_button02.png', 'yellow_button01.png', 'yellow_button03.png', 'yellow_button04.png');
    playButton.anchor.setTo(0.5);
    playButton.events.onInputOver.add(this._onInputHover, this);
    playButton.events.onKilled.add(this.startGame, this);
    playButton.inputEnabled = true;
    this.playButton = playButton;
    playButton.scale.setTo(2.2, 2.2);
  }

  /**
   * @callback _onPlayButton
   * @description Listen on input down of play button and perform necessary actions if it occurs.
   */
   _onPlayButton() {
    this.backgroundTiles.length = 0;
    this.buttonDownAudio.play();
    this.playButton.kill();
  }

  /**
   * @callback _onInputHover
   * @description Listen on input hover of play button and perform necessary actions if it occurs.
   */
   _onInputHover() {
    this.buttonHoverAudio.play('', '', 1, false);
  }

  /**
   * @function startGame
   * @description Start main state.
   */
   startGame() {
    this.state.start('Main');
  }

  /**
   * @function createPlayText
   * @description Create 'Play' text for the play button.
   */
  createPlayText() {
    this.textPlay = this.add.text(0, 0, 'Play', styleForPlayText);
    this.textPlay.anchor.setTo(0.5);
    this.textPlay.alignIn(this.playButton, Phaser.CENTER, 0, 0);
    this.textPlay.stroke = '#627577';
    this.textPlay.strokeThickness = 8;
  }

  /**
   * @function createUiButtons
   * @description Creates UI buttons.
   */
  createUiButtons() {
    this.closeButton = this.add.button(this.world.width - 120, 20, 'guisheet', this._onCloseButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.closeButtonIcon = this.add.image(this.world.width - 120, 20, 'uiicons', "cross.png");
    this.closeButton.scale.x = this.closeButton.scale.y = this.closeButtonIcon.scale.x = this.closeButtonIcon.scale.y = UI_SCALE_FACTOR;
  }

  /**
    * @callback _onCloseButton
    * @description Listen on input down of close button and perform necessary actions if it occurs.
    */
  _onCloseButton() {
    window.open("https://itch.io/");
  }

  /**
   * @function createTitleText
   * @description Create 'MoveUp' text.
   */
   createTitleText() {
    this.titleText = this.add.text(this.game.width * 0.5, this.game.height * 0.3, 'MoveUp', styleForTitleText);
    this.titleText.anchor.setTo(0.5);
    this.titleText.fontWeight="bold";
    this.titleText.stroke = '#000000';
    this.titleText.strokeThickness = 7;
  }
}
