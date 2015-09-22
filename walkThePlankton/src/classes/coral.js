/**
 * Created by Nanyou on 9/22/2015.
 */

var Coral = cc.Sprite.extend({
    ctor: function (offset_x,offset_y,scale) {
        var imgs = [res.coral1_png,res.coral2_png];
        var index = Math.floor((Math.random()*2));
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

        var xPos = win.width-(loc.x*this.scale+this.offset_x   + this.getParent().planktonObject.distanceMoved*40 * this.scale)%win.width;
        // var xPos = (win.width+this.width)-(loc.x*this.scale+this.offset_x)%(win.width+this.width)-this.width/2;

        this.setPosition(cc.p(xPos, this.height/2+this.offset_y));


    }
});