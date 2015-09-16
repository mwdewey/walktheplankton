/**
 * Created by Nanyou on 9/16/2015.
 */

var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        //add game layers in order
        this.addChild(new BackgroundLayer());
        this.addChild(new GameplayLayer());
        this.addChild(new OverlayLayer());
    }
});

