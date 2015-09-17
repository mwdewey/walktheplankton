var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();
        //get window size
        var winSize = cc.director.getWinSize();
        //create background image and position it at center of screen
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var spriteBG = new cc.Sprite(res.underwater_png);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
    }
});