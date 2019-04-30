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
   * @param {Phaser.Game} ctx (currently running game object).
   */
  constructor(ctx) {
    this.game = ctx;
    this._build();
  }

  /**
   * @function _build
   * @description Create graphic elements for the game over pop up.
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

    this.createRetryButton(); // Create retry button.

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
   * @function _onInputHover
   * @description Play music on inputh over.
   */
  _onInputHover() {
    this.buttonHoverMusic.play('', '', 1, false);
  }

  /**
   * @function createRetryButton
   * @description Create retry button.
   */
  createRetryButton() {
    this.buttonRetry = this.game.add.image(0, 0, 'retryButton');
    this.buttonRetry.anchor.setTo(0.5);
    this.buttonRetry.alignTo(this.gameScoreValueText, Phaser.BOTTOM_CENTER, 0, 50);
    this.buttonRetry.events.onInputOver.add(this._onInputHover, this);
    this.buttonRetry.events.onInputDown.add(this._onRetry, this);
    this.buttonRetry.inputEnabled = true;
    this.buttonRetry.scale.setTo(0.6);
    this.buttonRetry.visible = false;
  }

  /**
   * @function showGameOver
   * @param {Number} score
   * @param {boolean} [true] isGameOver
   * @description Show game over screen.
   */
  showGameOver(score, isGameOver = true) {
    if (!isGameOver) return isGameOver;
    this.buttonRetry.visible = true;
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

  /**
   * @function _onRetry
   * @description Listen on input down of retry button and perform necessary actions if it occurs.
   */
  _onRetry() {
    if (this.gameOverMusic.isPlaying) {
      this.gameOverMusic.stop();
    }
    this.buttonDownMusic.play();
    this.game.buttonJump.destroy();
    this.game.dPad.destroy();
    this.game.isGameOverVisible = false;
    this.game.state.restart();
    this.gameOverBackground.visible = false;
  }
}
