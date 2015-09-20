var Collectible = cc.Sprite.extend({

    ctor:function(xx, yy){
        this._super(res.rock1_png);
        this.x = xx;
        this.y = yy;
        this.value = 100;

    },


    update:function(dt) {

    }

});
/**
 * Created by Collin on 9/20/2015.
 */
