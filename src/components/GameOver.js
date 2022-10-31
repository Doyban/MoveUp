import {
  styleForGameOverText,
  styleForGameOverTextDpr2,
  styleForScoreText,
  styleForScoreValueText,
  styleForScoreValueTextDpr2,
  styleForScoreTextDpr2
} from '../helpers/gameConstants';

/**
 * @class
 * @description Create game over state.
 */
export default class GameOver {
  /**
   * @constructor
   * @param {Phaser.Game} ctx currently running game object.
   */
  constructor(ctx) {
    this.game = ctx;
    this._build();
  }

  /**
   * @function _build
   * @description Create graphic elements for the game over popup.
   */
  _build() {
    // Add music.
    this.buttonDownMusic = this.game.add.audio('buttonDown', 1, false);
    this.gameOverMusic = this.game.add.audio('gameOver', 1, false);
    this.buttonHoverMusic = this.game.add.audio('buttonHover', 1, false);

    // Create transparent background.
    this.transparentBackground = this.game.add.image(0, 0, 'transparentBackground');
    this.transparentBackground.alpha = 0.7;
    this.transparentBackground.height = this.game.world.height;
    this.transparentBackground.width = this.game.world.width;

    this.gameOverBackground = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'gameOverBackground'); // Create game over background.

    // Scale the background depending by device pixel ratio.
    if (devicePixelRatio > 3) {
      this.gameOverBackground.scale.setTo(2, 1.8); // For iPHone X / Pixel 2 XL / Samsun Galaxy.
    } else if (devicePixelRatio < 2.1) {
      this.gameOverBackground.scale.setTo(1.8, 1.65); // For iPhone 5/6 series.
    } else {
      this.gameOverBackground.scale.setTo(1.8, 1.65); // Most of mobile devices.
    }
    this.gameOverBackground.anchor.setTo(0.5);

    // Y position for the texts inside game over popup.
    this.textY = this.game.world.centerY - this.gameOverBackground.height / 2 + 120;

    // Create necessary texts.
    this.createGameOverText();
    this.createScoreText();
    this.createScoreValueText();

    this.createHomeButton(); // Create home button.
    this.createRetryButton(); // Create retry button.
    this.createShareButton(); // Create share button.

    // Initially make game over invisible.
    this.gameOverBackground.visible = false;
    this.transparentBackground.visible = false;
  }

  /**
   * @function createGameOverText
   * @description Create game over text with specific features.
   */
  createGameOverText() {
    let style = styleForGameOverText;

    if (devicePixelRatio < 2.1) {
      style = styleForGameOverTextDpr2; // For iPhone 5/6 series.
    }
    this.gameOverText = this.game.add.text(0, 0, 'Game Over', style);
    this.gameOverText.anchor.setTo(0.5);
    this.gameOverText.alignIn(this.gameOverBackground, Phaser.TOP_CENTER, 0, -50);
    this.gameOverText.stroke = '#627577';
    this.gameOverText.strokeThickness = 8;
    this.gameOverText.visible = false;
  }

  /**
   * @function createScoreText
   * @description Create score text.
   */
  createScoreText() {
    let style = styleForScoreText;

    if (devicePixelRatio < 2.1) {
      style = styleForScoreTextDpr2; // For iPhone 5/6 series.
    }
    this.gameScoreText = this.game.add.text(0, 0, 'Score', style);
    this.gameScoreText.anchor.setTo(0.5);
    this.gameScoreText.alignTo(this.gameOverText, Phaser.BOTTOM_CENTER, 0, 50);
    this.gameScoreText.stroke = '#627577';
    this.gameScoreText.strokeThickness = 8;
    this.gameScoreText.visible = false;
  }

  /**
   * @function createScoreValueText
   * @description Create score value text with default number '0'.
   */
  createScoreValueText() {
    let style = styleForScoreValueText;

    if (devicePixelRatio < 2.1) {
      style = styleForScoreValueTextDpr2; // For iPhone 5/6 series.
    }
    this.gameScoreValueText = this.game.add.text(0, 0, '0', style);
    this.gameScoreValueText.anchor.setTo(0.5);
    this.gameScoreValueText.alignTo(this.gameScoreText, Phaser.BOTTOM_CENTER, 0, 50);
    this.gameScoreValueText.stroke = '#627577';
    this.gameScoreValueText.strokeThickness = 8;
    this.gameScoreValueText.visible = false;
  }

  /**
   * @function createHomeButton
   * @description Create home button.
   */
  createHomeButton() {
    this.buttonHome = this.game.add.button(0, 0, 'guisheet', this._onHomeButtonClicked, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.buttonHome.anchor.setTo(0.5);
    this.buttonHome.alignTo(this.gameOverBackground, Phaser.BOTTOM_RIGHT, -50, -90);
    this.buttonHome.scale.setTo(2);
    this.buttonHome.visible = false;
    this.buttonHomeIcon = this.game.add.image(this.buttonHome.x, this.buttonHome.y - 5, 'uiicons', "home.png");
    this.buttonHomeIcon.anchor.setTo(0.5);
    this.buttonHomeIcon.scale.setTo(1.5);
    this.buttonHomeIcon.visible = false;
  }

  /**
   * @function _onHomeButtonClicked
   * @description Listen on input down of home button and perform necessary actions if it occurs.
   */
  _onHomeButtonClicked() {
    if (this.gameOverMusic.isPlaying) {
      this.gameOverMusic.stop();
    }
    this.buttonDownMusic.play();
    if (this.game.buttonJump) this.game.buttonJump.destroy();
    if (this.game.dPad) this.game.dPad.destroy();
    this.game.state.start("Preload");
  }

  /**
   * @function createRetryButton
   * @description Create retry button.
   */
  createRetryButton() {
    this.buttonRetry = this.game.add.button(0, 0, 'guisheet', this._onRetryButtonClicked, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.buttonRetry.anchor.setTo(0.5);
    this.buttonRetry.alignTo(this.gameOverBackground, Phaser.BOTTOM_LEFT, -50, -90);
    this.buttonRetry.scale.setTo(2);
    this.buttonRetry.visible = false;
    this.buttonRetryIcon = this.game.add.image(this.buttonRetry.x, this.buttonRetry.y - 5, 'uiicons', "return.png");
    this.buttonRetryIcon.anchor.setTo(0.5);
    this.buttonRetryIcon.scale.setTo(1.5);
    this.buttonRetryIcon.visible = false;
  }

  /**
   * @function createShareButton
   * @description Create share button.
   */
  createShareButton() {
    this.buttonShare = this.game.add.button(0, 0, 'guisheet', this._onShareButtonClicked, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
    this.buttonShare.anchor.setTo(0.5);
    this.buttonShare.alignTo(this.gameOverBackground, Phaser.BOTTOM_CENTER, 0, -90);
    this.buttonShare.scale.setTo(2);
    this.buttonShare.visible = false;
    this.buttonShareIcon = this.game.add.image(this.buttonShare.x, this.buttonShare.y - 5, 'uiicons', "share2.png");
    this.buttonShareIcon.anchor.setTo(0.5);
    this.buttonShareIcon.scale.setTo(1.5);
    this.buttonShareIcon.visible = false;
  }

  /**
   * @function _onRetryButtonClicked
   * @description Listen on input down of retry button and perform necessary actions if it occurs.
   */
  _onRetryButtonClicked() {
    if (this.gameOverMusic.isPlaying) {
      this.gameOverMusic.stop();
    }
    this.buttonDownMusic.play();
    if (this.game.buttonJump) this.game.buttonJump.destroy();
    if (this.game.dPad) this.game.dPad.destroy();
    this.game.isGameOverVisible = false;
    this.game.state.restart();
    this.gameOverBackground.visible = false;
  }

  /**
   * @function _onShareButtonClicked
   * @description Listen on input down of share button and perform necessary actions if it occurs.
   */
  _onShareButtonClicked() {
    // Setting up configuration for the event.
    const options = {
      message: 'Play MoveUp!', // not supported on some apps (Facebook, Instagram)
      subject: 'My score in MoveUp is ' + localStorage.score + '!', // fi. for email
      files: ['www/assets/images/logo.png'], // an array of filenames either locally or remotely
      url: 'https://doyban.com/moveup',
    };

    // Event handlers.
    const onSuccess = () => {
      alert("Sharing result successful.");
    };
    const onError = () => {
      alert("Sharing result unsuccessful.");
    };

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError); // Cordova plugin execution.
  }

  /**
   * @function showGameOver
   * @param {Number} score
   * @param {boolean} [true] isGameOver
   * @description Show game over screen.
   */
  showGameOver(score, isGameOver = true) {
    if (!isGameOver) return isGameOver;
    this.buttonHome.visible = true;
    this.buttonHomeIcon.visible = true;
    this.buttonRetry.visible = true;
    this.buttonRetryIcon.visible = true;
    this.buttonShare.visible = true;
    this.buttonShareIcon.visible = true;
    this.game.backgroundMusic.stop();
    this.game.isGameOverVisible = true;
    this.gameOverBackground.visible = true;
    this.gameOverMusic.play();
    this.gameOverText.visible = true;
    this.gameScoreValueText.setText(score, true);
    this.gameScoreValueText.visible = true;
    this.gameScoreText.visible = true;
    this.transparentBackground.visible = true;
  }
}
