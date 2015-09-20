/**
 * Created by Nanyou on 9/20/2015.
 */

var Rock = cc.Class.extend({
    space: null,
    sprite: null,
    shape: null,
    _map: 0,

    get map() {
        return this._map;
    },
    set map(newMap) {
        this._map = newMap;
    },

    ctor: function (spriteSheet, space, pos) {
        this.space = space;

        this.sprite = new cc.PhysicsSprite("#coral1.png");
        var radius = 0.95 * this.sprite.getContentSize().width / 2;
        var body = new cp.StaticBody();
        body.setPos(cc.p(pos, this.sprite.getContentSize().height / 2 + g_groundHeight));
        this.sprite.setBody(body);
        this.shape = new cp.CircleShape(body, radius, cp.vzero);
        this.shape.setCollisionType(SpriteTag.rock);
        this.space.addStaticShape(this.shape);
        spriteSheet.addChild(this.sprite);
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