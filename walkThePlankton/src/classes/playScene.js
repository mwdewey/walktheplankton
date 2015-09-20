/**
 * Created by Nanyou on 9/16/2015.
 */

var PlayScene = cc.Scene.extend({
    //space object used by chipmunk to represent physics world
    space: null,
    gameLayer: null,
    shapesToRemove: [],

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
        //setup chipmunk collision handler
        this.space.addCollisionHandler(
            SpriteTag.plankton,
            SpriteTag.bubble,
            this.collisionBubbleBegin.bind(this),
            null,
            null,
            null
        );
        this.space.addCollisionHandler(
            SpriteTag.plankton,
            SpriteTag.rock,
            this.collisionRockBegin.bind(this),
            null,
            null,
            null
        );
    },
    //define game's main loop
    update: function (dt) {
        //step in loop and tells chipmunk to simulate physics
        this.space.step(dt);

        var gameplayLayer = this.gameLayer.getChildByTag(TagOfLayer.gameplay);
        var eyeX = gameplayLayer.getEyeX();

        this.gameLayer.setPosition(cc.p(-eyeX, 0));
        for (var i = 0; i < this.shapesToRemove.length; i++) {
            var shape = this.shapesToRemove[i];
            this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
        }
        this.shapesToRemove = [];
    },
    onEnter: function () {
        this._super();
        this.initPhysics();

        this.shapesToRemove = [];
        this.gameLayer = new cc.Layer();
        //add game layers in order
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
        this.gameLayer.addChild(new GameplayLayer(this.space), 0, TagOfLayer.gameplay);
        this.addChild(this.gameLayer);
        this.gameLayer.addChild(new OverlayLayer(), 0, TagOfLayer.overlay);

        this.scheduleUpdate();
    },
    collisionBubbleBegin: function (other, space) {
        var shapes = other.getShapes();
        this.shapesToRemove.push(shapes[1]);
    },
    collisionRockBegin: function (other, space) {
        console.log("==hit rock");
    }
});

