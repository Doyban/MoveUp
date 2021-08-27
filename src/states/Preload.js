import {
  styleForPlayText
} from '../helpers/gameConstants';

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
     this.shopButton = this.add.button(this.world.centerX - 170, this.world.centerY + 100, 'guisheet', this._onShopButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
     this.shopButtonIcon = this.add.image(this.world.centerX - 170, this.world.centerY + 100, 'uiicons', "cart.png");
     this.shareButton = this.add.button(this.world.centerX - 70 , this.world.centerY + 100, 'guisheet', this._onShareButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
     this.shareButtonIcon = this.add.image(this.world.centerX - 70 , this.world.centerY + 100, 'uiicons', "share2.png");
     this.loginButton = this.add.button(this.world.centerX + 30, this.world.centerY + 100, 'guisheet', this._onLoginButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
     this.loginButtonIcon = this.add.image(this.world.centerX + 30, this.world.centerY + 100, 'uiicons', "singleplayer.png");
     this.friendsButton = this.add.button(this.world.centerX + 130, this.world.centerY + 100, 'guisheet', this._onFriendsButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
     this.friendsButtonIcon = this.add.image(this.world.centerX + 130, this.world.centerY + 100, 'uiicons', "multiplayer.png");
  }

  /**
   * @function _onPlayButton
   * @description Listen on input down of play button and perform necessary actions if it occurs.
   */
  _onPlayButton() {
    this.backgroundTiles.length = 0;
    this.buttonDownAudio.play();
    this.playButton.kill();
  }

  /**
   * @function _onShopButton
   * @description Listen on input down of shop button and perform necessary actions if it occurs.
   */
   _onShopButton() {
     console.log("shop button down");
  }

  /**
   * @function _onShareButton
   * @description Listen on input down of share button and perform necessary actions if it occurs.
   */
   _onShareButton() {
     console.log("share button down");
  }

  /**
   * @function _onLoginButton
   * @description Listen on input down of login button and perform necessary actions if it occurs.
   */
   _onLoginButton() {
     console.log("login button down");
  }

  /**
   * @function _onFriendsButton
   * @description Listen on input down of friends button and perform necessary actions if it occurs.
   */
   _onFriendsButton() {
     console.log("friends button down");
  }

  /**
   * @function _onInputHover playing the music onInput Hover
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
}
