import { ShopItem } from "./ShopItem";

/**
 * @class
 * @description Create Shop state.
 */
export class Shop {
    /**
     * @constructor
     * @param {Phaser.State} game - current state of the game where this popup needs to be rendered
     */
    constructor (game) {
        this._game = game;
        this.backgroundLayers = [];
        this._build();
    }

    /**
     * @function _build
     * @description Create and show all the game objects of the popup.
     */
    _build(){
        this.createBackground();
        this.createShopItems();
        this.show();
    }

    /**
     * @function createBackground
     * @description Create background of the popup.
     */
     createBackground(){
        // Create background.
        this.background = this._game.add.image(this._game.world.centerX, this._game.world.centerY, 'gameOverBackground');

        // Scale the background depending by device pixel ratio.
        if (devicePixelRatio > 3) {
          this.background.scale.setTo(2, 1.8); // For iPhone X / Pixel 2 XL / Samsung Galaxy.
        } else if (devicePixelRatio < 2.1) {
          this.background.scale.setTo(1.8, 1.65); // For iPhone 5/6 series.
        } else {
          this.background.scale.setTo(1.8, 1.65); // Most of mobile devices.
        }
        this.background.anchor.setTo(0.5);

        // Add the background to the backgroundLayers array from which all elements are being displayed later.
        this.backgroundLayers.push(this.background);
    }

     /**
     * @function createShopItems
     * @description Create all the shop items to the shop popup
     * @param {Number} [count=4] - number of items that can be add to the store
     */
      createShopItems(count = 4){
        let positions = [[-100, -100],[100, -100], [-100, 100], [100, 100]]; // Positions of ShopItems.
        let mulitpliers = [2, 3, 4, 6]; // Text "Score x[VALUE_IN_THIS_ARRAY]".

        // Add ShopItems to the backgroundLayers array.
        for (let i = 0; i < count; i++) {
            this.backgroundLayers.push(new ShopItem(this._game, {x : this._game.world.centerX + positions[i][0], y : this._game.world.centerY + positions[i][1]}, mulitpliers[i]));
        }
    }

    /**
     * @function show
     * @description Show/close all the game objects of the popup.
     * @param {boolean} [flag=false] - flag to show/close the popup.
     */
    show(flag = false) {
        // Make elements visible, depending by the flag.
        for (let i = 0; i < this.backgroundLayers.length; i++) {
            const backgroundLayer = this.backgroundLayers[i];
            if (backgroundLayer instanceof ShopItem) {
                backgroundLayer.show(flag);
            } else {
                backgroundLayer.visible = flag;
            }
        }
    }
}