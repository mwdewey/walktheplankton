var HUDLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var oAnim = new cc.Sprite();
        var o1 = new cc.SpriteFrame(res.CameraHud1_png, cc.rect(0,0,1600,900));
        var o2 = new cc.SpriteFrame(res.CameraHud2_png, cc.rect(0,0,1600,900));

        oAnim.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        oAnim.runAction(new cc.Animate(new cc.Animation([o1,o2], 1, 1000)));
        this.addChild(oAnim);

        var bAnim = new cc.Sprite();
        var b1 = new cc.SpriteFrame(res.BatteryStage1_png, cc.rect(0,0,1600,900));
        var b2 = new cc.SpriteFrame(res.BatteryStage2_png, cc.rect(0,0,1600,900));
        var b3 = new cc.SpriteFrame(res.BatteryStage3_png, cc.rect(0,0,1600,900));

        bAnim.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        bAnim.runAction(new cc.Animate(new cc.Animation([b1,b2,b3], 10, 1000)));
        this.addChild(bAnim);

        return true;
    }
});