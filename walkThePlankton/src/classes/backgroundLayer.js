/**
 * Created by Nanyou on 9/16/2015.
 */

var BackgroundLayer = cc.Layer.extend({
    map00: null,
    map01: null,
    mapWidth: 0,
    mapHeight: 0,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();
        /*
        //get window size
        var winSize = cc.director.getWinSize();
        //create background image and position it at center of screen
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var spriteBG = new cc.Sprite(res.underwaterbg);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
        */

        //create map00
        this.map00 = new cc.TMXTiledMap(res.map00_tmx);
        this.addChild(this.map00);
        //get map width
        this.mapWidth = this.map00.getContentSize().width;
        //create map01
        this.map01 = new cc.TMXTiledMap(res.map01_tmx);
        //set position of map01 to end of map00
        this.map01.setPosition(cc.p(this.mapWidth / 2, 0));
        this.addChild(this.map01);
    }
});