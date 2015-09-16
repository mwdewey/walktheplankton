var Scene2Layer = cc.Layer.extend({
    ctor:function () {
        this._super();

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: null,
                onKeyReleased: this.onKeyReleased
            }),this);

        var startLabel = new cc.LabelTTF("YAY more scenes!", "Segoe UI", 40);
        startLabel.x = cc.winSize.width/2;
        startLabel.y = cc.winSize.height/2;

        this.addChild(startLabel);

        return true;
    },
    onKeyReleased:function (event){
        cc.director.runScene(new Scene0());

        return true;
    }
});

var Scene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new Scene2Layer();
        this.addChild(layer);
    }

});