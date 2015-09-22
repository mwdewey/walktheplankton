var Scene1Layer = cc.Layer.extend({
    whaleSpriteSheet: null,
    munchAction: null,
    whaleSprite: null,
    planktonObject: null,

    ctor:function () {
        this._super();
        this.init();

        collect = new Collectible(200,200);
        this.addChild(collect);
        collect.x = 800; collect.y = 400;

        collect2 = new Collectible(200,200);
        this.addChild(collect2);
        collect2.x = 300; collect2.y = 100;

        collectibles = new Array();
        collectibles.push(collect);
        collectibles.push(collect2);

        obstacle = new Obstacle(200, 200);
        this.addChild(obstacle);
        obstacle.x = 1200; obstacle.y = 200;

        obstacle2 = new Obstacle(200, 200);
        this.addChild(obstacle2);
        obstacle2.x = 1000; obstacle2.y = 200;

        obstacle3 = new Obstacle(200, 200);
        this.addChild(obstacle3);
        obstacle3.x = 200; obstacle3.y = 400;

        obstacles = new Array();
        obstacles.push(obstacle);
        obstacles.push(obstacle2);
        obstacles.push(obstacle3);

        obstacles[0].runAction(cc.moveBy(15, cc.p(0, 500)));
        obstacles[1].runAction(cc.moveBy(15, cc.p(-800, 0)));

        return true;
    },

    init: function () {
        this._super();

        this.planktonObject = new Plankton(400,400);
        this.addChild(this.planktonObject);

        this.planktonObject.x = 400; this.planktonObject.y = 400;

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
            x: 100,
            y: 85
        });
        this.whaleSprite.runAction(this.munchAction);
        this.whaleSpriteSheet.addChild(this.whaleSprite);

        //check if whale is in line with plankton
        if(this.whaleSprite.y != this.planktonObject.y) {
            //create move action
            var follow = new cc.MoveTo(2, cc.p(100, this.planktonObject.y));
            //run action on whale
            this.whaleSprite.runAction(new cc.Sequence(follow));
        }

        this.scheduleUpdate();
    }
});

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

var Scene1 = cc.Scene.extend({
    onEnter:function () {
        this._super();


        this.addChild(new BackgroundLayer());
        this.addChild(new Scene1Layer());
        this.addChild(new HUDLayer());
    }

});