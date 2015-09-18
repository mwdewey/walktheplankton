/**
 * Created by Nanyou on 9/16/2015.
 */

var PlayScene = cc.Scene.extend({
    //space object used by chipmunk to represent physics world
    space: null,

    //initialize space
    initPhysics: function () {
        //create new space object
        this.space = new cp.Space();
        //set up gravity
        this.space.gravity = cp.v(0, 0);
        //set up bottom barrier
        var barrierBottom = new cp.SegmentShape(
            this.space.staticBody,
            //start point
            cp.v(0, g_groundHeight),
            //end point (4294967295 is max int size)
            cp.v(4294967295, g_groundHeight),
            //thickness of wall
            0
        );
        this.space.addStaticShape(barrierBottom);
    },
    //define game's main loop
    update: function (dt) {
        //step in loop and tells chipmunk to simulate physics
        this.space.step(dt);
    },
    onEnter: function () {
        this._super();
        this.initPhysics();
        //add game layers in order
        this.addChild(new BackgroundLayer());
        this.addChild(new GameplayLayer(this.space));
        this.addChild(new OverlayLayer());

        this.scheduleUpdate();
    }
});

