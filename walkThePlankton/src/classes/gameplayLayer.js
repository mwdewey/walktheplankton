/**
 * Created by Nanyou on 9/16/2015.
 */

var GameplayLayer = cc.Layer.extend({
    whaleSpriteSheet: null,
    munchAction: null,
    whaleSprite: null,
    space: null,
    planktonSprite: null,
    body: null,
    shape: null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        //parallax ratio and offset
        this.addChild(this._debugNode, 10);
    },
    init:function () {
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
        this.planktonSprite = new cc.PhysicsSprite(res.plankton);
        this.addChild(this.planktonSprite);
        var contentSize = this.planktonSprite.getContentSize();
        //initialize plankton physic body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        //set potion of plankton
        this.body.p = cc.p(g_startX, g_groundHeight + contentSize.height / 2);
        //apply impulse to body (movement speed)
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));
        //add body to space
        this.space.addBody(this.body);
        //create shape for body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        //add shape to space
        this.space.addShape(this.shape);
        //set body to appropriate sprite
        this.planktonSprite.setBody(this.body);

        // create whale sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.whale_plist);
        this.whaleSpriteSheet = new cc.SpriteBatchNode(res.whale_png);
        this.addChild(this.whaleSpriteSheet);


        //create spriteframe array
        var animFrames = [];
        //loop through frames in sprite sheet and add them to frame array
        for (var i = 0; i < 2; i++) {
            //generate sprite filename
            var str = "whale" + i + ".png";
            //get sprite frame from sprite sheet
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            //add sprite frame to array
            animFrames.push(frame);
        }

        //create animation with spriteframe array with a time period to display each frame
        var animation = new cc.Animation(animFrames, 0.1);
        //wrap animate action with repeat forever action to make animation continuous
        this.munchAction = new cc.RepeatForever(new cc.Animate(animation));
        //create whale sprite using frame's title with #
        this.whaleSprite = new cc.Sprite("#whale0.png");
        //create attributes for whale
        this.whaleSprite.attr({
            x: 80,
            y: 85
        });
        this.whaleSprite.runAction(this.munchAction);
        this.whaleSpriteSheet.addChild(this.whaleSprite);

        this.scheduleUpdate();
    },
    getEyeX: function () {
        //calculate delta movement of gameplay layer
        return this.planktonSprite.getPositionX() - g_startX;
    }

});