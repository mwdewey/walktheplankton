
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {

        this._super();

        var size = cc.winSize;

        //var background = new cc.Sprite (res.background_png);

        //this.addChild(background);

        //background.x = size.width / 2;
        //background.y = size.height / 2;


        var plankton = new Plankton();


        this.addChild(plankton);

        plankton.x = 200;
        plankton.y = 300;

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

