/**
 * Created by Collin on 9/21/2015.
 */
var Obstacle2 = cc.Sprite.extend({

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