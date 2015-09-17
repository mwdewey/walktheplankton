/**
 * Created by Nanyou on 9/16/2015.
 */

var GameplayLayer = cc.Layer.extend({
    whaleSpriteSheet: null,
    movingAction: null,
    whaleSprite: null,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();
        /**
        //create plankton sprite
        var plankton = new cc.Sprite(res.plankton);
        //create attributes for plankton
        plankton.attr({
            x: 80,
            y: 80
        });
        //create move action
        var actionTo = new cc.MoveTo(2, cc.p(300, 80));
        //run action on plankton
        plankton.runAction(new cc.Sequence(actionTo));
        this.addChild(plankton);
        **/

        //create spritesheet
        cc.spriteFrameCache.addSpriteFrame(res.whale_plist);
        this.whaleSpriteSheet = new cc.SpriteBatchNode(res.whale_png);
        this.addChild(this.whaleSpriteSheet);

        //create spriteframe array
        var animFrames = [];
        //loop through sprites in sprite sheet and add them to array
        for (var i = 1; i < 3; i++) {
            //generate sprite filename
            var str = "whale" + i + ".png";
            //get sprite frame from sprite sheet
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            //add sprite frame to array
            animFrames.push(frame);
        }
        //create animation with spriteframe array with a time period to display each frame
        var animation = new cc.Animation(animFrames, 0.5);
        //wrap animate action with repeat forever action to make animation continuous
        this.movingAction = new cc.repeatForever(new cc.Animate(animation));
        //create whale sprite
        this.whaleSprite = new cc.Sprite("#whale1.png");
        //create attributes for whale
        this.whaleSprite.attr({
            x: 30,
            y: 30
        });
        this.whaleSprite.runAction(this.movingAction);
        this.whaleSpriteSheet.addChild(this.whaleSprite);
    }
});