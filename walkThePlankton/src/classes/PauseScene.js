var PauseLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        cc.eventManager.addListener(
            cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: null,
                onKeyReleased: this.onKeyReleased
            }),this);

        var startLabel = new cc.LabelTTF("Paused", "Segoe UI", 40);
        startLabel.x = cc.winSize.width/2;
        startLabel.y = cc.winSize.height/2;

        this.addChild(startLabel);

        return true;
    },
    onKeyReleased:function (event){
        cc.director.popScene();

        return true;
    }
});

var PauseScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new PauseLayer();
        this.addChild(layer);
    }

});