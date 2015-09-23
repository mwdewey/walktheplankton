/**
 * Created by Nanyou on 9/21/2015.
 */

var GameplayLayer = cc.Layer.extend({
    whaleSpriteSheet: null,
    munchAction: null,
    whaleSprite: null,
    jellyfishSpriteSheet: null,
    floatAction: null,
    jellyfishSprite: null,
    shrimpSpriteSheet: null,
    swimAction: null,
    shrimpSprite: null,
    planktonObject: null,
    level1: null,
    level2: null,
    level3: null,
    levelIndex: 0,
    levelWidth: 0,
    objectSpriteSheet: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();

        /*
        //create level1
        this.level1 = new cc.TMXTiledMap(res.level1_tmx);
        this.addChild(this.level1);
        //get level width
        this.levelWidth = this.level1.getContentSize().width;
        //create level2
        this.level2 = new cc.TMXTiledMap(res.level2_tmx);
        //add level 2 to end of level 1
        this.level2.setPosition(cc.p(this.levelWidth, 0));
        this.addChild(this.level1);
        //create level3
        this.level3 = new cc.TMXTiledMap(res.level3_tmx);
        //add level 3 to end of level 2
        this.level3.setPosition(cc.p(this.level2.getContentSize().width, 0));
        this.addChild(this.level3);

        //create sprite sheet for obstacles and collectables
        cc.spriteFrameCache.addSpriteFrames(res.objects_plist);
        this.objectSpriteSheet = new cc.SpriteBatchNode(res.objects_png);
        this.addChild(this.objectSpriteSheet);

        this.loadObjects(this.level1, 0);
        this.loadObjects(this.level2, 1);
        this.loadObjects(this.level3, 2);
        */

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

        //create jellyfish sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.jellyfish_plist);
        this.jellyfishSpriteSheet = new cc.SpriteBatchNode(res.jellyfish_png);
        this.addChild(this.jellyfishSpriteSheet);

        //create sprite frame array
        var janimFrames = [];
        for(var i = 0; i < 2; i++) {
            var str = "jellyfish" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            janimFrames.push(frame);
        }

        var janimation = new cc.Animation(janimFrames, 0.1);
        this.floatAction = new cc.RepeatForever(new cc.Animate(janimation));
        this.jellyfishSprite = new cc.Sprite("#jellyfish0.png");
        this.jellyfishSprite.attr({
            x: 200,
            y: 20
        });
        this.jellyfishSprite.runAction(this.floatAction);
        this.jellyfishSpriteSheet.addChild(this.jellyfishSprite);

        //create shrimp sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.shrimp_plist);
        this.shrimpSpriteSheet = new cc.SpriteBatchNode(res.shrimp_png);
        this.addChild(this.shrimpSpriteSheet);

        //create sprite frame array
        var sanimFrames = [];
        for(var i = 0; i < 2; i++) {
            var str = "shrimp" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            sanimFrames.push(frame);
        }

        var sanimation = new cc.Animation(sanimFrames, 0.1);
        this.swimAction = new cc.RepeatForever(new cc.Animate(sanimation));
        this.shrimpSprite = new cc.Sprite("#shrimp0.png");
        this.shrimpSprite.attr({
            x: 200,
            y: 700
        });
        this.shrimpSprite.runAction(this.swimAction);
        this.shrimpSpriteSheet.addChild(this.shrimpSprite);

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

    /*
    progressCheck: function (pX) {
        //check if player's x position is greater than width of level
        var newLevelIndex = parseInt(px / this.levelWidth);
        if(this.levelIndex == newLevelIndex) {
            return false;
        }
        if(newLevelIndex % 3 == 0) {
            //change to third level
            this.level3.setPositionX(this.levelWidth * (newLevelIndex + 1));
        } else if(newLevelIndex % 3 == 1) {
            //change to second level
            this.level2.setPositionX(this.levelWidth * (newLevelIndex + 1));
        } else {
            //change to first level
            this.level1.setPositionX(this.levelWidth * (newLevelIndex + 1));
        }
        this.levelIndex = newLevelIndex;
        return true;
    }
    */
});