import { styleForScoreText, styleForScoreTextDpr2ShopItem, styleForScoreTextDpr2Multiplier } from "../helpers/gameConstants";

/**
 * @class ShopItem
 * @description this class is about the shop item in the popup
 */
export class ShopItem {
  /**
   * @constructor
   * @param {Phaser.State} game - Phaser.State
   * @param {*} pos - position `{x, y}`
   * @param {*} multiplier - number 
   */
  constructor(game, pos, multiplier){
    this._game = game;
    this.visible = false;
    this.position = pos;
    this.multiplier = multiplier;
    this.children = [];
    this._build();
  }

  /**
     * @function _build
     * @description this function will create and add al the game objects of the item
     */
  _build(){
    this.createBackground();
    this.createScoreText();
    this.createScoreXText();
    this.createScoreMultiplierText();
  }

  /**
     * @function show
     * @description this function will be responsible for showing or hiding all the game objects of the item.
     * @param {boolean} flag 
     */
  show(flag = false){
    for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.visible = flag;
    }
  }

  /**
   * @function createBackground
   * @description this function will create background of the item
   */
  createBackground(){
    this.bg = this._game.add.button(this.position.x, this.position.y, 'guisheet', this.onItemClicked, this, 'yellow_button07.png', 'yellow_button07.png', 'yellow_button07.png', 'yellow_button07.png');
    // this.bg = this._game.add.image(this.position.x, this.position.y, "guisheet",'yellow_button07.png');
    this.children.push(this.bg);
    // Scale the background depending by device pixel ratio.
    if (devicePixelRatio > 3) {
      this.bg.scale.setTo(3.2, 3); // For iPHone X / Pixel 2 XL / Samsun Galaxy.
    } else if (devicePixelRatio < 2.1) {
      this.bg.scale.setTo(3, 2.85); // For iPhone 5/6 series.
    } else {
      this.bg.scale.setTo(3, 2.85); // Most of mobile devices.
    }
    this.bg.anchor.setTo(0.5);
  }

  /**
   * @function createScoreText
   * @description this function will create Score text of the item
   */
  createScoreText() {
    let style = styleForScoreTextDpr2ShopItem;

    // this.gameScoreText = this._game.add.text(this.position.x, this.position.y, 'Score', style);
    this.gameScoreText = this._game.add.text(0, -10, 'Score', style);
    this.gameScoreText.anchor.setTo(0.5);
    // this.gameScoreText.alignTo(this.bg, Phaser.CENTER, -10, -60);
    this.gameScoreText.stroke = '#627577';
    this.gameScoreText.strokeThickness = 2.2;

    this.bg.addChild(this.gameScoreText);
  }

  /**
   * @function createScoreXText
   * @description this function will create Score X text of the item
   */
  createScoreXText() {
    let style = styleForScoreTextDpr2ShopItem;

    this.gameScoreTextX = this._game.add.text(-8, 10, "x", style);
    this.gameScoreTextX.anchor.setTo(0.5);
    this.gameScoreTextX.stroke = '#627577';
    this.gameScoreTextX.strokeThickness = 3;
    this.gameScoreText.autoRound = true;
    this.gameScoreText.lineSpacing = 5;
    this.bg.addChild(this.gameScoreTextX);
  }

  /**
   * @function createScoreMultiplierText
   * @description this function will create Score X multiplier text of the item
   */
  createScoreMultiplierText() {
    let style = styleForScoreTextDpr2Multiplier;

    this.gameScoreTextX = this._game.add.text(8, 10, this.multiplier, style);
    this.gameScoreTextX.anchor.setTo(0.5);
    this.gameScoreTextX.stroke = '#627577';
    this.gameScoreTextX.strokeThickness = 3;

    this.bg.addChild(this.gameScoreTextX);
  }

  /**
   * @callback
   * @description will be called after this item clicked
   */
  onItemClicked(){
    alert(`item clicked ${this.multiplier}`)
  }

}