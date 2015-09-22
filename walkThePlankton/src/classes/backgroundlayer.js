var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();

        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var spriteBG = new cc.Sprite(res.underwater_png);

        spriteBG.setPosition(centerPos);

        this.addChild(spriteBG);
    },
    update: function (dt) {
        var loc = this.getParent().getChildByTag(TagOfLayer.gameplay).planktonObject.getPosition();
        var win = cc.director.getWinSize();

        this.setPosition(cc.p(win.width-loc.x*this.scale+this.offset_x, this.height/2+this.offset_y));


    }

});