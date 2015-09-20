/**
 * Created by Nanyou on 9/20/2015.
 */

var Bubble = cc.Class.extend({
    space: null,
    sprite: null,
    shape: null,
    //used to specify which map this object belongs to
    _map: 0,

    get map() {
        return this._map;
    },
    set map(newMap) {
        this._map = newMap;
    },

    ctor: function (spriteSheet, space, pos) {
        this.space = space;
        //initialize bubble animation here
        var animFrames = [];
        for (var i = 0; i < 2; i++) {
            var str = "bubbles" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.5);
        var action = new cc.RepeatForever(new cc.Animate(animation));
        this.sprite = new cc.PhysicsSprite("#bubbles0.png");
        //initialize physics
        var radius = 0.95 * this.sprite.getContentSize().width / 2;
        var body = new cp.StaticBody();
        body.setPos(pos);
        this.sprite.setBody(body);
        this.shape = new cp.CircleShape(body, radius, cp.vzero);
        this.shape.setCollisionType(SpriteTag.bubble);
        //making it a sensor makes it only call collision code not actually do collision
        this.shape.setSensor(true);
        this.space.addStaticShape(this.shape);
        //add sprite to sprite sheet
        this.sprite.runAction(action);
        spriteSheet.addChild(this.sprite, 1);
    },
    removeFromParent: function () {
        this.space.removeStaticShape(this.shape);
        this.shape = null;
        this.sprite.removeFromParent();
        this.sprite = null;
    },
    getShape: function () {
        return this.shape;
    }
});