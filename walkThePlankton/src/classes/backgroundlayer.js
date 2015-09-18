var WeedObject = cc.Sprite.extend({
    ctor: function (offset_x,offset_y,scale) {
        var imgs = [res.weed_png,res.weed2_png,res.weed3_png];
        var index = Math.floor((Math.random()*3));
        this._super(imgs[index]);

        this.init();
        this.scheduleUpdate();

        this.offset_x = offset_x;
        this.offset_y = offset_y;
        this.scale = scale;
    },
    init: function () {

    },
    update: function (dt) {
        var loc = planktonObject.getPosition();
        var win = cc.director.getWinSize();

        var xPos = win.width-(loc.x*this.scale+this.offset_x)%win.width;

        this.setPosition(cc.p(xPos, this.height/2+this.offset_y));
    }
});

var CoralObject = cc.Sprite.extend({
    ctor: function (offset_x,offset_y,scale) {
        var imgs = [res.coral1_png,res.coral2_png];
        var index = Math.floor((Math.random()*2));
        this._super(imgs[index]);

        this.init();
        this.scheduleUpdate();

        this.offset_x = offset_x;
        this.offset_y = offset_y;
        this.scale = scale;
    },
    init: function () {

    },
    update: function (dt) {
        var loc = planktonObject.getPosition();
        var win = cc.director.getWinSize();

        var xPos = win.width-(loc.x*this.scale+this.offset_x)%win.width;

        this.setPosition(cc.p(xPos, this.height/2+this.offset_y));
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

        for(var i=0; i<15; i++)this.addChild(new WeedObject(i*100,100,0.25));
        for(var i=0; i<12; i++)this.addChild(new CoralObject(i*125,75,0.375));
        for(var j=0; j<10; j++)this.addChild(new WeedObject(j*150,50,0.50));
        for(var j=0; j<7; j++)this.addChild(new CoralObject(j*175,25,0.75));
        for(var k=0; k<5; k++)this.addChild(new WeedObject(k*200,0,1));

    },
    update: function (dt) {
        var loc = planktonObject.getPosition();
        var win = cc.director.getWinSize();

        this.setPosition(cc.p(win.width-loc.x*this.scale+this.offset_x, this.height/2+this.offset_y));
    }

});