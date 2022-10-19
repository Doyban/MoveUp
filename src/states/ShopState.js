
import { ShopItem } from "../components/ShopItem";
import { UI_SCALE_FACTOR } from "./Preload";

/**
 * @class
 * @description Create Shop state.
 */
export class ShopState extends Phaser.State {
    /**
     * @constructor
     */
    constructor () {
        super();
        this.backgroundLayers = [];
    }

    /**
     * @function create
     * @description Once preload is completed start creating necessary game elements.
     */
    create(){
        this.createBackground();
        this.createCloseButton();
        this.createShopItems();
        this.show(true);
    }

    /**
    * @function createBackground
    * @description Create background with respective tile for background.
    */
    createBackground() {
        let background = [];

        // Get dimensions of used tile.
        this.tileHeightBackground = this.cache.getImage('gameBackgroundTile').height;
        this.tileWidthBackground = this.cache.getImage('gameBackgroundTile').width;

        for (let i = 0; i <= this.game.width; i += this.tileWidthBackground) {
          for (let j = 0; j <= this.game.height; j += this.tileHeightBackground) {
            background.push(this.add.image(i, j, 'gameBackgroundTile'));
          }
        }
    }

    /**
    * @function createCloseButton
    * @description Create the close button to close the shop.
    */
    createCloseButton(){
        this.closeButton = this.add.button(this.world.width - 120, 20, 'guisheet', this._onCloseButton, this, 'yellow_button07.png', 'yellow_button08.png', 'yellow_button09.png', 'yellow_button10.png');
        this.closeButtonIcon = this.add.image(this.world.width - 120, 20, 'uiicons', "cross.png");
        this.closeButton.scale.x = this.closeButton.scale.y = this.closeButtonIcon.scale.x = this.closeButtonIcon.scale.y = UI_SCALE_FACTOR;
    }

    /**
    * @function createShopItems
    * @description Create all the shop items to the shop popup
    * @param {Number} [count=4] - number of items that can be add to the store
    */
     createShopItems(count = 4){
       let positions = [[-100, -100], [100, -100], [-100, 100], [100, 100]]; // Positions of ShopItems.
       let mulitpliers = [2, 3, 4, 6]; // Text "Score x[VALUE_IN_THIS_ARRAY]".

       // Add ShopItems to the backgroundLayers array.
       for (let i = 0; i < count; i++) {
           this.backgroundLayers.push(new ShopItem(this, {x : this.world.centerX + positions[i][0], y : this.world.centerY + positions[i][1]}, mulitpliers[i]));
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

    /**
    * @callback _onCloseButton
    * @description Listen on input down of close button and perform necessary actions if it occurs.
    */
    _onCloseButton(){
        this.state.start('Preload');
    }
}
