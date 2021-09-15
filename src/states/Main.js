import {
  movingVelocity,
  jumpingVelocity,
  platformSpeed
} from '../helpers/gameConstants';
import GameOver from '../components/GameOver.js';
import { UI_SCALE_FACTOR } from './Preload';

/**
 * @class Main
 * @description Main game actions and behaviours.
 * @extends Phaser.State
 */
export default class Main extends Phaser.State {
  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * @function
   * @description Before any function will be called this ones is, scale game.
   */
  init() {
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  /**
   * @function addAudioFiles
   * @description Add audio files.
   */
  addAudioFiles() {
    this.backgroundMusic = this.add.audio('background', 1, true);
    this.buttonDownAudio = this.add.audio('buttonDown', 1, false);
    this.jumpAudio = this.add.audio('buttonJump', 1, false);
  }

  /**
   * @function create
   * @description Once init is completed start creating necessary game elements.
   */
  create() {
    // Add and start playing background music.
    this.addAudioFiles();
    this.backgroundMusic.play();

    this.setInitData(); // Set up basic game data.

    // Get dimensions of used tile.
    this.tileWidthBackground = this.cache.getImage('gameBackgroundTile').width;
    this.tileHeightBackground = this.cache.getImage('gameBackgroundTile').height;

    // Get dimensions of the tile used for background.
    this.tileWidth = this.cache.getImage('tile').width;
    this.tileHeight = this.cache.getImage('tile').height;

    this.createBackground(); // Create background.

    this.physics.startSystem(Phaser.Physics.ARCADE); // Enable Arcade physics system.

    // Add platforms group to hold all tiles.
    this.platforms = this.add.group();
    this.platforms.enableBody = true;

    this.platforms.createMultiple(300, 'tile'); // Create bunch of tiles (300) to fill the screen.

    // Initialize and create basic properties.
    this.initPlatforms();
    this.createPlayer();
    this.createScore();

    // Screen resolution factor.
    if (Phaser.Device.iPhone) {
      this.timer = this.time.events.loop(this.platformSpeed - 1700, this.addPlatform, this); // Add platform every 0.6 seconds.
      this.timer.delay = 3000; // Change delay of the timer to manage the space.
    } else {

      this.timer = this.time.events.loop(this.platformSpeed, this.addPlatform, this); // Add a platform every 2.3 seconds.
      this.timer.delay = 3000; // Change delay of the timer to manage the space.
    }

    this.cursors = this.input.keyboard.createCursorKeys(); // Enable cursor keys to enable controls.
    this.virtualJoyStick = this.game.plugins.add(Phaser.VirtualJoystick); // Add virtual joystick.

    // create music button
    this.createMusicOnButton();
    this.createMusicOffButton();
    
    this._checkMusicState();
    // Create mobile controls.
    // TODO: Remove it for desktop deployments.
    this.createVirtualJoystick();
    this.createJumpButton();

    this.scaleVirtualJoyStickIfNotIphone(); // Scale virtual joystick if this is not iphone.

    this.dPad.alignBottomLeft(1); // Align virtual joystick.

    this.gameOverPopup = new GameOver(this); // Create game over pop up.
  }

  /**
   * @function update
   * @description Update and re-drawing the game objects, running all the time till the state is active.
   */
  update() {

    this.player.body.velocity.x = 0; // Not move the player if no input action is found.


    this.physics.arcade.collide(this.player, this.platforms); // Make the sprite collide with the ground layer.

    // Make the sprite jump when the up key is pushed.
    if (this.cursors.up.isDown && this.player.body.wasTouching.down) {
      this.playerMoveUp();
    }
    // Make the player go left.
    if (this.cursors.left.isDown) {
      this.playerMovingAnimation();
      this.player.body.velocity.x += -this.movingVelocity;
    }
    // Make the player go right.
    if (this.cursors.right.isDown) {
      this.playerMovingAnimation();
      this.player.body.velocity.x += this.movingVelocity;
    }
    // Check if the player is touching the bottom.
    if (this.player.body.position.y >= this.world.height - this.player.body.height && !this.isGameOverVisible) {
      this.gameOver();
    }
    // Virtual joystick controls.
    if (this.dPad.isDown) {
      if (this.dPad.direction === Phaser.LEFT) {
        this.playerMovingAnimation();
        this.player.body.velocity.x = -this.movingVelocity;
      } else if (this.dPad.direction === Phaser.RIGHT) {
        this.playerMovingAnimation();
        this.player.body.velocity.x = this.movingVelocity;
      }

    }
  }


  /**
   * @function setInitData
   * @descripton Initialize basic game data.
   */
  setInitData() {
		this.movingVelocity = movingVelocity;
    this.jumpingVelocity = jumpingVelocity;
    this.isGameOverVisible = false; // Restrict calling game over pop up many times.
		this.spacing = 450; // Spacing for initial platforms.
    this.platformSpeed = platformSpeed; // Platform speed (timer).

    // Settings for desktop.
    if (this.world.width > this.world.height && Phaser.Device.desktop) {
      this.spacing = 400;
      this.platformSpeed -= 500;
    }

		this.score = 0; // Set up initial score.
  }

  /**
   * @function createBackground
   * @description Create background with respective tile for background.
   */
  createBackground() {
    let background = [];
    for (let i = 0; i <= this.game.width; i += this.tileWidthBackground) {
      for (let j = 0; j <= this.game.height; j += this.tileHeightBackground) {
        background.push(this.add.image(i, j, 'gameBackgroundTile'));
      }
    }
  }

  /**
   * @function createVirtualJoystick
   * Create virtual joystick.
   */
  createVirtualJoystick() {
    this.dPad = this.virtualJoyStick.addDPad(0, 0, 200, 'dpad');
  }

  /**
   * @function createJumpButton
   * @description Create jump button.
   */
  createJumpButton() {
    this.buttonJump = this.virtualJoyStick.addButton(this.world.width - 100, this.world.height - 100, 'dpad', 'button1-up', 'button1-up');
    this.buttonJump.onDown.add(() => {
      if (this.player.body.wasTouching.down) {
        this.playerMoveUp();
      }
    }, this);
  }

  /**
   * @function scaleVirtualJoyStickIfNotIphone
   * @description In case of different phone than iPhone scale it accordingly.
   */
  scaleVirtualJoyStickIfNotIphone() {
    if (!Phaser.Device.iPhone) {
      this.buttonJump.sprite.scale.x = 1.4;
      this.buttonJump.sprite.scale.y = 1.4;
      this.dPad.sprite.scale.x = 1.5;
      this.dPad.sprite.scale.y = 1.5;
    }
  }

  /**
   * @function playerMoveUp
   * @descripton Behaviour for moving up.
   */
  playerMoveUp() {
    this.jumpAudio.play('', '', 1, false, true);
    this.playerMovingAnimation();
    this.player.body.velocity.y = -this.jumpingVelocity;
  }

  /**
   * @function gameOver
   * @description Handle game over.
   */
  gameOver() {
    this.gameOverPopup.showGameOver(this.score);
    this.physics.arcade.isPaused = true;
    this.scoreLabel.visible = false;
    this.time.removeAll();
  }

  /**
   * @function addTile
   * @description Add tile to the game at specific coordinates, including reseting functionality.
   * @param {Number} x - position x to reset the tile.
   * @param {Number} y - position y to reset the tile.
   */
  addTile(x, y) {
    let tile = this.platforms.getFirstDead(); // Get a tile that is not currently on screen.

    // Reset it to the specified coordinates.
		tile.reset(x, y);
    tile.body.immovable = true;
    tile.body.velocity.y = 150;

    // When the tile leaves the screen, kill it.
    tile.checkWorldBounds = true;
    tile.outOfBoundsKill = true;
  }

  /**
   * @function addPlatform
   * @description Add platforms to move up.
   * @param {Number} y - y position to the platform.
   */
  addPlatform(y) {
    // If no y position is supplied, render it just outside of the screen. Making here === undefined creates a weird behaviour with creating tiles, so it has to be like that.
    if (typeof(y) == 'undefined') {
      y = -this.tileHeight;
      this.incrementScore(); // Increment the players score.
    }

    let tilesNeeded = Math.ceil(this.world.width / this.tileWidth); // Calculate how many tiles we need to fit across the whole screen.

    let hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1; // Add a hole (space for the player to jump) randomly somewhere.

    // Keep creating tiles next to each other until an entire row won't be filled, including not adding tiles where the random hole (space for the player to jump) is.
    for (let i = 0; i < tilesNeeded; i++) {
      if (i != hole && i != hole + 1 && i != hole + 2 && i != hole + 3) {
        this.addTile(i * this.tileWidth, y);
      }
    }
  }

  /**
   * @function initPlatforms
   * @description Create initial platforms.
   */
  initPlatforms() {
    let bottom = this.world.height - this.tileHeight;
    let top = this.tileHeight;

    // Keep creating platforms until they reach (near) the top of the screen.
    for (var y = bottom; y > top - this.tileHeight; y = y - this.spacing) {
      this.addPlatform(y);
    }
  }

  /**
   * @function createPlayer
   * @description Define player properties.
   */
  createPlayer() {
    this.player = this.add.sprite(this.world.centerX, this.world.height - (this.spacing * 2 + (3 * this.tileHeight)), 'player', 5);
    this.physics.arcade.enable(this.player); // Enable physics on the player.
    this.player.anchor.setTo(0.5, 0.9);
    this.player.body.gravity.y = 2000; // Make the player falling by applying gravity.
    this.player.body.bounce.y = 0.1; // Make the player bounce a little bit.
    this.player.body.collideWorldBounds = true; // Make the player collide with the game boundaries.
    this.player.animations.add('move'); // Add animation once the player moves.
  }

  /**
   * @function createScore
   * @description Create score text.
   */
  createScore() {
    let scoreFont = '100px Arial';
    this.scoreLabel = this.add.text((this.world.centerX), 100, '0', {
      font: scoreFont,
      fill: '#fff'
    });
		this.scoreLabel.anchor.setTo(0.5, 0.5);
    this.scoreLabel.align = 'center';
    this.scoreLabel.stroke = '#627577';
    this.scoreLabel.strokeThickness = 10;
  }

  /**
   * @function incrementScore
   * @description Score manipulation.
   */
  incrementScore() {
    this.score += 1;
    this.scoreLabel.text = this.score;
  }

  /**
   * @function playerMovingAnimation
   * @description Moving animation.
   */
  playerMovingAnimation() {
    this.player.animations.play('move', 10);
  }

  /**
   * @function createMusicOnButton
   * @description creates music on button
   */
  createMusicOnButton(){
    this.musicOnButton = this.add.button(this.world.width - 120, 30, "guisheet", this._onMusicOnButtonDown, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.musicOnButtonIcon = this.add.image(this.world.width - 120, 30, "musicon");
    this.musicOnButton.scale.x = this.musicOnButton.scale.y = this.musicOnButtonIcon.scale.x = this.musicOnButtonIcon.scale.y = UI_SCALE_FACTOR;
  }
  
  /**
   * @function createMusicOffButton
   * @description creates music on button
   */
  createMusicOffButton(){
    this.musicOffButton = this.add.button(this.world.width - 120, 30, "guisheet", this._onMusicOffButtonDown, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.musicOffButtonIcon = this.add.image(this.world.width - 120, 30,"musicoff");
    this.musicOffButton.scale.x = this.musicOffButton.scale.y = this.musicOffButtonIcon.scale.x = this.musicOffButtonIcon.scale.y = UI_SCALE_FACTOR;
    this.musicOffButton.visible = false;
    this.musicOffButtonIcon.visible = false;
  }

  /**
   * @function _onMusicOnButtonDown
   * @description Listen on input down of music on button and perform necessary actions if it occurs.
   */
  _onMusicOnButtonDown(){
    this.sound.mute = true;
    this.musicOnButton.visible = false;
    this.musicOnButtonIcon.visible = false;
    this.musicOffButton.visible = true;
    this.musicOffButtonIcon.visible = true;
  }

  /**
   * @function _onMusicOffButtonDown
   * @description Listen on input down of music off button and perform necessary actions if it occurs.
   */
   _onMusicOffButtonDown(){
     this.sound.mute = false;
    this.musicOnButton.visible = true;
    this.musicOnButtonIcon.visible = true;
    this.musicOffButton.visible = false;
    this.musicOffButtonIcon.visible = false;
  }

  /**
   * @function _checkMusicState
   * @description will check the last state of the music buttons and do relavent action.
   */
   _checkMusicState(){
     if (this.sound.mute) {
       this._onMusicOnButtonDown();
     } else {
       this._onMusicOffButtonDown();
     }
  }
}
