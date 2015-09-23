/**
 * Created by Collin on 9/20/2015.
 */
var Collectible = cc.Sprite.extend({

    ctor:function(xx, yy){
        this._super(res.collectible_png);
        //this._super(res.bubbles1_png);
        this.x = xx;
        this.y = yy;
        this.value = 100;

        this.scheduleUpdate();
    },


    update:function(dt) {
        this.setPositionX(this.x - currentSpeed);
    }
});