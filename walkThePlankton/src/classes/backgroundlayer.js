var Layer1 = cc.Sprite.extend({
    ctor: function (offset,scale) {
        this._super(res.weed_png);
        this.init();
        this.scheduleUpdate();

        this.offset = offset;
        this.scale = scale;
    },
    init: function () {
        var winSize = cc.director.getWinSize();
        var rbx = winSize.width + this.width/2;
        var rby = this.height/2;
        var lbx = -this.width/2;
        var lby = this.height/2;
    },
    update: function (dt) {
        var loc = planktonObject.getPosition();
        var win = cc.director.getWinSize();

        this.setPosition(cc.p(win.width-loc.x*this.scale, this.height/2+this.offset));
    }



});

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

        this.addChild(new Layer1(100,0.25));
        this.addChild(new Layer1(50,0.5));
        this.addChild(new Layer1(0,1));
    }
});