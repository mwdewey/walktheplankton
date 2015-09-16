var Scene1Layer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var background = new cc.Sprite (res.underwater_png);
        this.addChild(background);

        //cc.eventManager.addListener(
        //    cc.EventListener.create({
        //        event: cc.EventListener.KEYBOARD,
        //        onKeyPressed: null,
        //        onKeyReleased: this.onKeyReleased
        //    }),this);
        //
        //var startLabel = new cc.LabelTTF("YAY SCENE 1", "Segoe UI", 40);
        //startLabel.x = cc.winSize.width/2;
        //startLabel.y = cc.winSize.height/2;
        //
        //this.addChild(startLabel);

        this.plankton = new Plankton(400,400);
        this.addChild(this.plankton);

        this.plankton.x = 400; this.plankton.y = 400;

        return true;
    },
    onKeyReleased:function (event){
        cc.director.runScene(new Scene2());

        return true;
    }
});

var Scene1 = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new Scene1Layer();
        this.addChild(layer);
    }

});