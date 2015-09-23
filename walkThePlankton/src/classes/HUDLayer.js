var HUDLayer = cc.Layer.extend({
    distanceLabel: null,
    scoreLabel: null,
    score: null,

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

        //get window size
        var winSize = cc.director.getWinSize();
        //set label initial text, font, font size
        this.distanceLabel = new cc.LabelTTF("0M", "Helvetica", 50);
        //set label color (black)
        this.distanceLabel.setColor(cc.color(0, 0, 0));
        //set label position on screen
        this.distanceLabel.setPosition(cc.p(75, winSize.height - 200));
        //add label to layer
        this.addChild(this.distanceLabel);
        //set label initial text, font, font size
        this.scoreLabel = new cc.LabelTTF("Score: 0", "Helvetica", 50);
        //set label color (black)
        this.scoreLabel.setColor(cc.color(0, 0, 0));
        //set label position on screen
        this.scoreLabel.setPosition(cc.p(100, winSize.height - 250));
        //add label to layer
        this.addChild(this.scoreLabel);
    },

    updateDistance: function (dt) {
        this.distanceLabel.setString(dt + "M");
    },

    addScore: function (num) {
        this.score += num;
        this.scoreLabel.setString("Score:" + this.score);
    }
});