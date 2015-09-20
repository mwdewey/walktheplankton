var HUDLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.scheduleUpdate();

        var oAnim = new cc.Sprite();
        var o1 = new cc.SpriteFrame(res.CameraHud1_png, cc.rect(0,0,1600,900));
        var o2 = new cc.SpriteFrame(res.CameraHud2_png, cc.rect(0,0,1600,900));

        oAnim.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        oAnim.runAction(new cc.Animate(new cc.Animation([o1,o2], 1, 1000)));
        this.addChild(oAnim);

        var bAnim = new cc.Sprite();
        var b1 = new cc.SpriteFrame(res.BatteryStage1_png, cc.rect(0,0,1600,900));
        var b2 = new cc.SpriteFrame(res.BatteryStage2_png, cc.rect(0,0,1600,900));
        var b3 = new cc.SpriteFrame(res.BatteryStage3_png, cc.rect(0,0,1600,900));

        bAnim.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        bAnim.runAction(new cc.Animate(new cc.Animation([b1,b2,b3], 10, 1000)));
        this.addChild(bAnim);

        startLabel = new cc.LabelTTF("MEEP", "Segoe UI", 40);
        startLabel.x = cc.winSize.width/2;
        startLabel.y = cc.winSize.height/2;

        this.addChild(startLabel);

        block = new cc.Sprite();
        block.setColor(new cc.Color(50,50,50,50));
        block.setPosition(cc.winSize.width/2-300,cc.winSize.height/2);
        block.setTextureRect(cc.rect(0, 0, 100,100));
        block.setOpacity(180);
        this.addChild(block);

        return true;
    },
    update:function(){

    }
});