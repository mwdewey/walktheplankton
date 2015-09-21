/**
 * Created by Mikes Gaming on 9/17/2015.
 */
var Obstacle = cc.Sprite.extend({

    ctor:function(xx, yy){
        this._super(res.rock2_png);
        this.x = xx;
        this.y = yy;
        this.scheduleUpdate();
    },


    update:function(dt) {
        this.setPositionX(this.x - currentSpeed);
    }

});