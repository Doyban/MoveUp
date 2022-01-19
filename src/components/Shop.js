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
        this.children = [];
        this._build();
    }

    /**
     * @function _build
     * @description Create and add all the game objects of the popup.
     */
    _build(){
        this.createBackground();
        this.createShopItems();
        this.show();
    }

    /**
     * @function createBackground
     * @description Create background of the po pup.
     */
     createBackground(){
        this.gameOverBackground = this._game.add.image(this._game.world.centerX, this._game.world.centerY, 'gameOverBackground');

        // Scale the background depending by device pixel ratio.
        if (devicePixelRatio > 3) {
          this.gameOverBackground.scale.setTo(2, 1.8); // For iPhone X / Pixel 2 XL / Samsung Galaxy.
        } else if (devicePixelRatio < 2.1) {
          this.gameOverBackground.scale.setTo(1.8, 1.65); // For iPhone 5/6 series.
        } else {
          this.gameOverBackground.scale.setTo(1.8, 1.65); // Most of mobile devices.
        }
        this.gameOverBackground.anchor.setTo(0.5);
        this.children.push(this.gameOverBackground);
    }

     /**
     * @function createShopItems
     * @description Create all the shop items to the shop popup
     * @param {Number} [count=4] - number of items that can be add to the store
     */
      createShopItems(count = 4){
        let positions = [[-100, -100],[100, -100], [-100, 100], [100, 100]];
        let mulitpliers = [2, 3, 4, 5];

        for (let i = 0; i < count; i++) {
            this.children.push(new ShopItem(this._game, {x : this._game.world.centerX + positions[i][0], y : this._game.world.centerY + positions[i][1]}, mulitpliers[i]));
        }
    }

    /**
     * @function show
     * @description Show/hide all the game objects of the popup.
     * @param {boolean} [flag=false] - flag to show/hide the popup.
     */
    show(flag = false){
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if (child instanceof ShopItem) {
                child.show(flag);
            } else {
                child.visible = flag;
            }
        }
    }
}