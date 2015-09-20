var Scene1Layer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var startLabel = new cc.LabelTTF("YAY SCENE 1", "Segoe UI", 40);
        startLabel.x = cc.winSize.width/2;
        startLabel.y = cc.winSize.height/2;

        this.addChild(startLabel);

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

        obstacles = new Array();
        obstacles.push(obstacle);
        return true;
    }
});

var Scene1 = cc.Scene.extend({
    onEnter:function () {
        this._super();


        this.addChild(new BackgroundLayer());
        this.addChild(new Scene1Layer());
    }

});