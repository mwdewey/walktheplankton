var StartLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        cc.log("Debugging is working.");

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: this.onKeyPressed,
                onKeyReleased: this.onKeyReleased
            }), this);

        var startLabel = new cc.LabelTTF("Press this", "Segoe UI", 40);
        startLabel.x = cc.winSize.width / 2;
        startLabel.y = cc.winSize.height / 2;

        this.addChild(startLabel);

        return true;
    },
    onKeyPressed: function (event) {
        if (event == enumKeyCodes.KEY_B) cc.log(event);
        return true;
    },
    onKeyReleased: function (event) {
        if (event == enumKeyCodes.KEY_B) cc.log(event);
    }
});

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

        plankton.x = size.width/2;
        plankton.y = size.height/2;


        var moving = cc.moveBy(2, cc.p(80,80));
        var moving2 = cc.moveBy(5, cc.p(180,10));
        plankton.runAction(moving);
        plankton.runAction(moving2);

        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }

});


