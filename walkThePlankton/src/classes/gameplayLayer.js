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
    currentEnemy: null,
    enemyFade: false,
    enemyAppear: false,
    currentLevel: 1,

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

        currentSpeed = 5;

        this.Level1();

        //create plankton object/sprite
        this.planktonObject = new Plankton(600,400);
        this.addChild(this.planktonObject);

        this.scheduleUpdate();
    },

    update: function (dt) {
        //check if enemy is in line with plankton
        if(this.currentEnemy.y != this.planktonObject.y && !this.enemyFade && !this.enemyAppear) {
            //create move action
            var follow = new cc.MoveTo(0, cc.p(this.currentEnemy.x, this.planktonObject.y));
            //run action on enemy
            this.currentEnemy.runAction(new cc.Sequence(follow));
        }

        var p = this.planktonObject;
        if(p.distanceMovedAbsolute > 25000 && !p.scene2Gen)
        {
            this.Level2();
            p.scene2Gen = true;
        }
        else if(p.distanceMovedAbsolute > 50000 && !p.scene3Gen)
        {
            this.Level3();
            p.scene3Gen = true;
        }

        var fade = new cc.MoveTo(2, cc.p(-1000, 0));
        var appear = new cc.MoveTo(2, cc.p(200, p.y));
        if(p.distanceMovedAbsolute > 24000 && !this.enemyFade && this.currentLevel == 1) {
            this.enemyFade = true;
            this.currentEnemy.runAction(new cc.Sequence(fade));
        }
        if(p.distanceMovedAbsolute > 27000 && !this.enemyAppear && this.enemyFade && this.currentLevel == 2) {
            this.enemyAppear = true;
            this.enemyFade = false;
            this.currentEnemy.runAction(new cc.Sequence(appear));
        }
        if(p.distanceMovedAbsolute > 28000 && this.enemyAppear && !this.enemyFade && this.currentLevel == 2) {
            this.enemyAppear = false;
        }
        if(p.distanceMovedAbsolute > 49000 && !this.enemyFade && !this.enemyAppear && this.currentLevel == 2) {
            this.enemyAppear = true;
            this.enemyFade = true;
            this.currentEnemy.runAction(new cc.Sequence(fade));
        }
        if(p.distanceMovedAbsolute > 50500 && this.enemyAppear && this.enemyFade && this.currentLevel == 3) {
            this.enemyAppear = false;
        }
        if(p.distanceMovedAbsolute > 52000 && !this.enemyAppear && this.enemyFade && this.currentLevel == 3) {
            this.enemyAppear = true;
            this.enemyFade = false;
            this.currentEnemy.runAction(new cc.Sequence(appear));
        }
        if(p.distanceMovedAbsolute > 54000 && this.currentLevel == 3) {
            this.enemyAppear = false;
        }

        this.planktonCollisionCheck();
    },

    Level1: function(){
        currentSpeed = 7;
        //generate obstacles and collectibles
        collectibles = new Array();
        obstacles = new Array();
        for(var i = 0; i < 40; i++){
            collect = new Collectible(200, 200);
            this.addChild(collect);
            collect.x = Math.random() * 100 + 500 * i + 2000; collect.y = 100 + Math.random() * 600;
            //collect.setScale(.4, null);
            collectibles.push(collect);
            cc.log(i);
        }

        for(var i = 0; i < 35; i++){
            obstacle = new Obstacle2(200, 200);
            this.addChild(obstacle);
            obstacle.x = Math.random() * 100 + 600 * i+ 2000; obstacle.y = 50 + Math.random() * 800;
            obstacle.setScale(1, null);
            obstacles.push(obstacle);
        }

        for(var i = 0; i < 22; i++){
            obstacle = new Obstacle(200, 200);
            this.addChild(obstacle);
            obstacle.x = Math.random() * 400 + 1000 * i + 2000; obstacle.y = 50 + Math.random() * 800;
            obstacle.setScale(1, null);
            obstacles.push(obstacle);
        }

        for(var i = 0; i < 11; i++){
            obstacle = new Obstacle3(200, 200);
            this.addChild(obstacle);
            obstacle.x = Math.random() * 800 + 2000 * i + 2000; obstacle.y = 50 + Math.random() * 800;
            obstacle.setScale(1, null);
            obstacles.push(obstacle);
        }

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

        this.currentEnemy = this.shrimpSprite;
    },

    Level2: function(){
        this.currentLevel = 2;
        currentSpeed = 7;
        //generate obstacles and collectibles
        collectibles = new Array();
        obstacles = new Array();
        for(var i = 0; i < 50; i++){
            collect = new Collectible(200, 200);
            this.addChild(collect);
            collect.x = Math.random() * 100 + 400 * i     + 2000; collect.y = 100 + Math.random() * 600;
            //collect.setScale(.4, null);
            collectibles.push(collect);
            cc.log(i);
        }

        for(var i = 0; i < 55; i++){
            obstacle = new Obstacle2(200, 200);
            this.addChild(obstacle);
            obstacle.x = Math.random() * 100 + 380 * i     + 2000; obstacle.y = 50 + Math.random() * 800;
            obstacle.setScale(1, null);
            obstacles.push(obstacle);
        }

        for(var i = 0; i < 33; i++){
            obstacle = new Obstacle(200, 200);
            this.addChild(obstacle);
            obstacle.x = Math.random() * 400 + 630 * i     + 2000; obstacle.y = 50 + Math.random() * 800;
            obstacle.setScale(1, null);
            obstacles.push(obstacle);
        }

        for(var i = 0; i < 18; i++){
            obstacle = new Obstacle3(200, 200);
            this.addChild(obstacle);
            obstacle.x = Math.random() * 800 + 1100 * i     + 2000; obstacle.y = 50 + Math.random() * 800;
            obstacle.setScale(1, null);
            obstacles.push(obstacle);
        }

        this.removeChild(this.shrimpSpriteSheet);

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
            x: -500,
            y: 20
        });
        this.jellyfishSprite.runAction(this.floatAction);
        this.jellyfishSpriteSheet.addChild(this.jellyfishSprite);

        this.currentEnemy = this.jellyfishSprite;
    },

    Level3: function(){
        this.currentLevel = 3;
        collectibles = new Array();
        obstacles = new Array();
        var limit = 25000;
        var currentDistance = 1600;
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

        this.removeChild(this.jellyfishSpriteSheet);

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
            x: -500,
            y: 85
        });
        //run animation
        this.whaleSprite.runAction(this.munchAction);
        this.whaleSpriteSheet.addChild(this.whaleSprite);

        this.currentEnemy = this.whaleSprite;
    },

    planktonCollisionCheck: function(){
        if(!this.planktonObject.isOver && cc.rectIntersectsRect(this.planktonObject.getBoundingBox(), this.currentEnemy.getBoundingBox())){
            this.planktonObject.isOver = true;
            cc.director.pause();
            this.getParent().addChild(new GameOverLayer());
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