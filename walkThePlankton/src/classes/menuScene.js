/**
 * Created by Nanyou on 9/16/2015.
 */

var MenuLayer = cc.Layer.extend({
    ctor: function (){
        //call class's ctor function
        this._super();
    },
    init: function () {
        //call class's super function
        this._super();
        //get screen size for game canvas
        var winSize = cc.director.getWinSize();
        //calculate center
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        //create background image and set it's position to center of screen
        var spriteBG =  new cc.Sprite(res.underwaterbg);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
        //set font size
        cc.MenuItemFont.setFontSize(50);
        //create menu and assign onPlay event callback to it
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.startButtonNormal),
            new cc.Sprite(res.startButtonSelect),
            this.onPlay, this);
        //create the menu
        var menu = new cc.Menu(menuItemPlay);
        menu.setPosition(centerPos);
        this.addChild(menu);
    },
    //this function is called when play button is clicked
    onPlay: function () {
        cc.log("==onplay clicked");
        //create and switch to play scene
        cc.director.runScene(new PlayScene());
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});