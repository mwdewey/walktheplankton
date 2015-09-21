var Scene1Layer = cc.Layer.extend({
    ctor:function () {
        this._super();

        planktonObject = new Plankton(400,400);
        this.addChild(planktonObject);

        planktonObject.x = 400; planktonObject.y = 400;





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