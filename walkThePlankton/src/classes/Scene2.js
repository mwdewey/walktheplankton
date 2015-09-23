var Scene2Layer = cc.Layer.extend({

    onEnter:function () {
        this._super();
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var spriteBG = new cc.Sprite(res.end_png);

        var spriteSM = new cc.Sprite(res.Plankton_png);

        var spriteText = new cc.Sprite(res.text_png);

        spriteSM.setPosition(cc.p(winSize.width/2 - 200, winSize.height/2 -100));
        spriteText.setPosition(cc.p(winSize.width/2 - 200, winSize.height/2 +100));
        spriteBG.setPosition(centerPos);

        this.addChild(spriteBG);
        this.addChild(spriteText);
        this.addChild(spriteSM);



    },

    init: function () {

    },

    update: function(dt){

    }
});

var Scene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new Scene2Layer();
        this.addChild(layer);
    }

});