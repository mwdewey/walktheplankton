/**
 * Created by Nanyou on 9/22/2015.
 */

var GameOverLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super(cc.color(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();

        var centerPos  = cc.p(winSize.width / 2, winSize.height / 2);
        cc.MenuItemFont.setFontSize(50);
        var menuItemRestart = new cc.MenuItemSprite(
            new cc.Sprite(res.restartButtonNormal),
            new cc.Sprite(res.restartButtonSelect),
            this.onRestart,
            this
        );
        var menu = new cc.Menu(menuItemRestart);
        menu.setPosition(centerPos);
        this.addChild(menu);
    },
    onRestart: function (caller) {
        cc.director.resume();
        cc.director.runScene(new Manager());
    }
});