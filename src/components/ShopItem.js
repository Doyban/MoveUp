import { styleForScoreTextDpr2ShopItem, styleForScoreTextDpr2Multiplier } from "../helpers/gameConstants";

/**
 * @class ShopItem
 * @description Create ShopItem state.
 */
export class ShopItem {
  /**
   * @constructor
   * @param {Phaser.State} game - Phaser.State
   * @param {Object} pos - position `{x, y}`
   * @param {Number} multiplier - number
   */
  constructor(game, pos, multiplier) {
    this._game = game;
    this.backgroundLayers = [];
    this.multiplier = multiplier;
    this.position = pos;
    this.visible = false;
    this._build();
  }

  /**
   * @function _build
   * @description Create graphic elements for the ShopItem.
   */
  _build() {
    this.createBackground();
    this.createScoreText();
    this.createScoreXText();
    this.createScoreMultiplierText();
  }

  /**
   * @function createBackground
   * @description Create background of the ShopItem.
   */
  createBackground() {
    // Create background.
    this.background = this._game.add.button(this.position.x, this.position.y, 'guisheet', this.onItemClicked, this, 'yellow_button07.png', 'yellow_button07.png', 'yellow_button07.png', 'yellow_button07.png');

    // Scale the background depending by device pixel ratio.
    if (devicePixelRatio > 3) {
      this.background.scale.setTo(3.2, 3); // For iPHone X / Pixel 2 XL / Samsun Galaxy.
    } else if (devicePixelRatio < 2.1) {
      this.background.scale.setTo(3, 2.85); // For iPhone 5/6 series.
    } else {
      this.background.scale.setTo(3, 2.85); // Most of mobile devices.
    }
    this.background.anchor.setTo(0.5);

    // Add the background to the backgroundLayers array from which all elements are being displayed later.
    this.backgroundLayers.push(this.background);
  }

  /**
   * @callback
   * @description Listen on input down of ShopItem and perform necessary actions if it occurs.
   */
  onItemClicked() {
    const that = this;
    store.refresh();

    // Prepare product.
    store.register({
      id: `scorex${this.multiplier}`,
      alias: `Score ${this.multiplier}`,
      type: store.CONSUMABLE
    });

    // Purchase product.
    store.order(`scorex${this.multiplier}`);
    store.refresh();
    store.when(`scorex${this.multiplier}`).approved(function (order) {
      order.finish();
      store.refresh();

      // Add extra score and begin the game.
      localStorage.scoreRate = this.multiplier;
      that.game.state.start('ShopState');
    });
  }

  /**
   * @function createScoreText
   * @description Create Score text of the ShopItem.
   */
  createScoreText() {
    this.gameScoreText = this._game.add.text(0, -10, 'Score', styleForScoreTextDpr2ShopItem);
    this.gameScoreText.anchor.setTo(0.5);
    this.gameScoreText.stroke = '#627577';
    this.gameScoreText.strokeThickness = 2.2;
    this.background.addChild(this.gameScoreText);
  }

  /**
   * @function createScoreXText
   * @description Create "x" text between "Score" and "[VALUE_IN_THE_ARRAY]".
   */
  createScoreXText() {
    this.gameScoreText.autoRound = true;
    this.gameScoreText.lineSpacing = 5;
    this.gameScoreTextX = this._game.add.text(-8, 10, "x", styleForScoreTextDpr2ShopItem);
    this.gameScoreTextX.anchor.setTo(0.5);
    this.gameScoreTextX.stroke = '#627577';
    this.gameScoreTextX.strokeThickness = 3;
    this.background.addChild(this.gameScoreTextX);
  }

  /**
   * @function createScoreMultiplierText
   * @description Create "[VALUE_IN_THE_ARRAY]" text before "Score x".
   */
  createScoreMultiplierText() {
    this.gameScoreTextX = this._game.add.text(8, 10, this.multiplier, styleForScoreTextDpr2Multiplier);
    this.gameScoreTextX.anchor.setTo(0.5);
    this.gameScoreTextX.stroke = '#627577';
    this.gameScoreTextX.strokeThickness = 3;

    // Add the text to the background.
    this.background.addChild(this.gameScoreTextX);
  }

  /**
    * @function show
    * @description Show/close all the game objects of the ShopItem.
    * @param {boolean} [flag=false] - flag to show/close the ShopItem.
    */
  show(flag = false) {
    // Make elements visible, depending by the flag.
    for (let i = 0; i < this.backgroundLayers.length; i++) {
      const backgroundLayer = this.backgroundLayers[i];
      backgroundLayer.visible = flag;
    }
  }
}
