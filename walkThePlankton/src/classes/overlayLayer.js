/**
 * Created by Nanyou on 9/16/2015.
 */

var OverlayLayer = cc.Layer.extend({
    //create label for distance counter
    labelDistance: null,
    labelScore: null,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();
        //get window size
        var winSize = cc.director.getWinSize();
        //set label initial text, font, font size
        this.labelDistance = new cc.LabelTTF("0M", "Helvetica", 20);
        //set label color (black)
        this.labelDistance.setColor(cc.color(0, 0, 0));
        //set label position on screen
        this.labelDistance.setPosition(cc.p(70, winSize.height - 20));
        //add label to layer
        this.addChild(this.labelDistance);
        //set label initial text, font, font size
        this.labelScore = new cc.LabelTTF("Score:", "Helvetica", 20);
        //set label color (black)
        this.labelScore.setColor(cc.color(0, 0, 0));
        //set label position on screen
        this.labelScore.setPosition(cc.p(70, winSize.height - 50));
        //add label to layer
        this.addChild(this.labelScore);
    },
    updateDistance: function (px) {
        //calculate distance by dividing pixels by 10 (10px = 1M)
        this.labelDistance.setString(parseInt(px / 10) + "M");
    },
    addScore: function (num) {
        this.score += num;
        this.labelScore.setString("Score:" + this.score);
    }
});