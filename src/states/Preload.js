import {
  styleForPlayText, styleForTitleText
} from '../helpers/gameConstants';
import { Shop } from '../components/Shop';

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
    this.isShopOpened = false;
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
    if (this.isShopOpened) {
      return;
    }
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
    this.shopButton = this.add.button(this.world.centerX - 290, this.world.centerY + 150, 'guisheet', this._onShopButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.shopButtonIcon = this.add.image(this.world.centerX - 290, this.world.centerY + 150, 'uiicons', "cart.png");
    this.shopButton.scale.x = this.shopButton.scale.y = this.shopButtonIcon.scale.x = this.shopButtonIcon.scale.y = UI_SCALE_FACTOR;
    this.shareButton = this.add.button(this.world.centerX - 130, this.world.centerY + 150, 'guisheet', this._onShareButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.shareButtonIcon = this.add.image(this.world.centerX - 130, this.world.centerY + 150, 'uiicons', "share2.png");
    this.shareButton.scale.x = this.shareButton.scale.y = this.shareButtonIcon.scale.x = this.shareButtonIcon.scale.y = UI_SCALE_FACTOR;
    this.loginButton = this.add.button(this.world.centerX + 40, this.world.centerY + 150, 'guisheet', this._onLoginButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.loginButtonIcon = this.add.image(this.world.centerX + 40, this.world.centerY + 150, 'uiicons', "singleplayer.png");
    this.loginButton.scale.x = this.loginButton.scale.y = this.loginButtonIcon.scale.x = this.loginButtonIcon.scale.y = UI_SCALE_FACTOR;
    this.friendsButton = this.add.button(this.world.centerX + 210, this.world.centerY + 150, 'guisheet', this._onInviteFriendsButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.friendsButtonIcon = this.add.image(this.world.centerX + 210, this.world.centerY + 150, 'uiicons', "multiplayer.png");
    this.friendsButton.scale.x = this.friendsButton.scale.y = this.friendsButtonIcon.scale.x = this.friendsButtonIcon.scale.y = UI_SCALE_FACTOR;
    this.closeButton = this.add.button(this.world.width - 120, 20, 'guisheet', this._onCloseButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.closeButtonIcon = this.add.image(this.world.width - 120, 20, 'uiicons', "cross.png");
    this.closeButton.scale.x = this.closeButton.scale.y = this.closeButtonIcon.scale.x = this.closeButtonIcon.scale.y = UI_SCALE_FACTOR;

    localStorage.scoreRate = localStorage.scoreRate || 1; // Initialize scoreRate.
    initAd(); // Initialize AdMob.
  }

  /**
   * @callback _onShopButton
   * @description Listen on input down of shop button and perform necessary actions if it occurs.
   */
  _onShopButton() {
    if (this.isShopOpened) return;

    this.state.start('ShopState');
  }

  /**
   * @callback _onShareButton
   * @description Listen on input down of share button and perform necessary actions if it occurs.
   */
  _onShareButton() {
    if (this.isShopOpened) return;

    // This is the complete list of currently supported params you can pass to the plugin (all optional)
    const options = {
      message: 'Play MoveUp!', // not supported on some apps (Facebook, Instagram)
      subject: 'Play MoveUp!', // fi. for email
      files: ['https://doyban.com/logos/piratebay.png', 'https://doyban.com/logos/moveup.png'], // an array of filenames either locally or remotely
      url: 'https://doyban.com/moveup',
    };

    const onSuccess = function (result) {
      alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      alert("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };

    const onError = function (msg) {
      alert("Sharing failed with message: " + msg);
    };

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
  }

  /**
   * @callback _onLoginButton
   * @description Listen on input down of login button and perform necessary actions if it occurs.
   */
  _onLoginButton() {
    if (this.isShopOpened) return;
    global.FirebaseAPI.prototype.loginUser(); // Log in user through Firebase.
  }

  /**
   * @callback _onInviteFriendsButton
   * @description Listen on input down of friends button and perform necessary actions if it occurs.
   */
  _onInviteFriendsButton() {
    if (this.isShopOpened) return;
    this.options = {
      method: 'apprequests',
      message: 'Play MoveUp with me!'
    };
    this.onSuccess = function (result) {
      alert("Success with invite");
    };
    this.onError = function (msg) {
      alert("Failed with invite");
    };

    facebookConnectPlugin.showDialog(this.options, this.onSuccess, this.onError);
  }

  /**
    * @callback _onCloseButton
    * @description Listen on input down of close button and perform necessary actions if it occurs.
    */
  _onCloseButton() {
    if (this.isShopOpened) {
      // Close Shop with its ShopItems.
      this.shop.show();
      this.isShopOpened = false;
    } else {
      // Close the game.
      navigator.app.exitApp();
    }
  }

  /**
   * @function createTitleText
   * @description Create 'MoveUp' text.
   */
  createTitleText() {
    this.titleText = this.add.text(this.game.width * 0.5, this.game.height * 0.3, 'MoveUp', styleForTitleText);
    this.titleText.anchor.setTo(0.5);
    this.titleText.fontWeight = "bold";
    this.titleText.stroke = '#000000';
    this.titleText.strokeThickness = 7;
  }
}
