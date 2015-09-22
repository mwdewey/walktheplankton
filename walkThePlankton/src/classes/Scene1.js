var Scene1Layer = cc.Layer.extend({
    ctor:function () {
        this._super();

        planktonObject = new Plankton(400,400);
        this.addChild(planktonObject);

        planktonObject.x = 400; planktonObject.y = 400;


        currentSpeed = 5;




        collectibles = new Array();
        for(var i = 0; i < 20; i++){
            collect = new Collectible(200, 200);
            this.addChild(collect);
            collect.x = Math.random() * 100 + 500 * i; collect.y = 100 + Math.random() * 600;
            collect.setScale(.4, null);
            collectibles.push(collect);
        }




        obstacles = new Array();
        for(var i = 0; i < 50; i++){
            obstacle = new Obstacle2(200, 200);
            this.addChild(obstacle);
            obstacle.x = Math.random() * 100 + 300 * i; obstacle.y = 100 + Math.random() * 600;
            //obstacle.setScale(.5, null);
            obstacles.push(obstacle);
        }



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