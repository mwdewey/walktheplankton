var HUDLayer1 = cc.Layer.extend({
    ctor:function () {
        this._super();

        var o1 = new cc.Sprite (res.Camera_Hud1_png);
        var o2 = new cc.Sprite (res.Camera_Hud2_png);
        var b1 = new cc.Sprite (res.Battery_stage1_png);
        var b2 = new cc.Sprite (res.Battery_stage2_png);
        var b3 = new cc.Sprite (res.Battery_stage3_png);

        var oAnimation = new cc.RepeatForever(new cc.Animate(new cc.Animation([o1,o2], 2)));
        var bAnimation = new cc.RepeatForever(new cc.Animate(new cc.Animation([b1,b2,b3], 2)));

        //this.addChild(oAnimation);
        //this.addChild(bAnimation);
        
        return true;
    }
});