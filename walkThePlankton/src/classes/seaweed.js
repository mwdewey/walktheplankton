/**
 * Created by Nanyou on 9/22/2015.
 */

var Seaweed = cc.Sprite.extend({
    ctor: function (offset_x,offset_y,scale) {
        var imgs = [res.weed_png,res.weed2_png,res.weed3_png];
        var index = Math.floor((Math.random()*3));
        this._super(imgs[index]);

        this.init();
        this.scheduleUpdate();

        this.offset_x = offset_x;
        this.offset_y = offset_y;
        this.scale = scale;
    },
    init: function () {

    },
    update: function (dt) {
        var loc = this.getParent().planktonObject.getPosition();
        var win = cc.director.getWinSize();

        var xPos = win.width-(loc.x*this.scale+this.offset_x  + this.getParent().planktonObject.distanceMoved*40 * this.scale)%win.width;
        //var xPos = (win.width+this.width)-(loc.x*this.scale+this.offset_x)%(win.width+this.width)-this.width/2;

        this.setPosition(cc.p(xPos, this.height/2+this.offset_y));
    }
});
