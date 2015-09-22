var Scene1Layer = cc.Layer.extend({
    whaleSpriteSheet: null,
    munchAction: null,
    whaleSprite: null,
    planktonObject: null,

    ctor:function () {
        this._super();
<<<<<<< HEAD
        this.init();
=======

        planktonObject = new Plankton(400,400);
        this.addChild(planktonObject);

        planktonObject.x = 400; planktonObject.y = 400;


        currentSpeed = 5;


>>>>>>> development


        collectibles = new Array();
        for(var i = 0; i < 20; i++){
            collect = new Collectible(200, 200);
            this.addChild(collect);
            collect.x = Math.random() * 100 + 500 * i; collect.y = 100 + Math.random() * 600;
            collect.setScale(.4, null);
            collectibles.push(collect);
        }




        obstacles = new Array();
<<<<<<< HEAD
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
=======
        for(var i = 0; i < 50; i++){
            obstacle = new Obstacle2(200, 200);
            this.addChild(obstacle);
            obstacle.x = Math.random() * 100 + 300 * i; obstacle.y = 100 + Math.random() * 600;
            //obstacle.setScale(.5, null);
            obstacles.push(obstacle);
        }
>>>>>>> development



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