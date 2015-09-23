/**
 * Created by Nanyou on 9/22/2015.
 */

var PauseLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super(cc.color(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();

        var centerPos  = cc.p(winSize.width / 2, winSize.height / 2);
        cc.MenuItemFont.setFontSize(50);
        var menuItemResume = new cc.MenuItemSprite(
            new cc.Sprite(res.resumeButtonNormal),
            new cc.Sprite(res.resumeButtonSelect),
            this.onResume,
            this
        );
        var menu = new cc.Menu(menuItemResume);
        menu.setPosition(centerPos);
        this.addChild(menu);
    },

    onResume: function (caller) {
        cc.director.resume();
        this.getParent().removeChild(this);
    }
});