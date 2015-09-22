/**
 * Created by Nanyou on 9/21/2015.
 */

var GameplayLayer = cc.Layer.extend({
    whaleSpriteSheet: null,
    munchAction: null,
    whaleSprite: null,
    planktonObject: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();

        //generate terrain
        var i;
        for(i=0; i<15; i++)this.addChild(new Seaweed(i*100,100,0.25));
        for(i=0; i<12; i++)this.addChild(new Coral(i*125,75,0.375));
        for(i=0; i<10; i++)this.addChild(new Seaweed(i*150,50,0.50));
        for(i=0; i<7; i++)this.addChild(new Coral(i*175,25,0.75));
        for(i=0; i<5; i++)this.addChild(new Seaweed(i*200,0,1));

        //generate obstacles and collectibles
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

        //create plankton object/sprite
        this.planktonObject = new Plankton(600,400);
        this.addChild(this.planktonObject);

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
            x: 250,
            y: 85
        });
        //run animation
        this.whaleSprite.runAction(this.munchAction);
        this.whaleSpriteSheet.addChild(this.whaleSprite);

        this.scheduleUpdate();
    },

    update: function (dt) {
        //check if whale is in line with plankton
        if(this.whaleSprite.y != this.planktonObject.y) {
            //create move action
            var follow = new cc.MoveTo(0, cc.p(this.whaleSprite.x, this.planktonObject.y));
            //run action on whale
            this.whaleSprite.runAction(new cc.Sequence(follow));
        }
    }
});