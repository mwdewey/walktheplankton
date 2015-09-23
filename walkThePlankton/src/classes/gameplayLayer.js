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


        currentSpeed = 5;
        //generate obstacles and collectibles
        collectibles = new Array();
        for(var i = 0; i < 50; i++){
            collect = new Collectible(200, 200);
            this.addChild(collect);
            collect.x = Math.random() * 100 + 500 * i; collect.y = 100 + Math.random() * 600;
            collect.setScale(.4, null);
            collectibles.push(collect);
            cc.log(i);
        }

        obstacles = new Array();
        var limit = 20000;
        var currentDistance = 1200;
        var spacing = 800;
        while(currentDistance < limit)
        {
            var randSpace = Math.random()*200;
            var xPos = currentDistance;
            var spaceIndex = Math.floor(Math.random()*8);

            for(var i=0; i<8; i++)
            {
                if(spaceIndex != i)
                {
                    var obstacle = new Obstacle2(200, 200);
                    this.addChild(obstacle);

                    obstacle.x = xPos+randSpace;
                    obstacle.y = obstacle.height/2 + obstacle.height * i;

                    obstacle.setScale(1, null);
                    obstacles.push(obstacle);
                }
            }

            currentDistance += spacing+randSpace;
        }

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