/**
 * Created by Nanyou on 9/21/2015.
 */

var Manager = cc.Scene.extend({
    gameLayer: null,

    onEnter: function () {
        this._super();

        this.gameLayer = new cc.Layer();
        //add game layers in order
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
        this.gameLayer.addChild(new GameplayLayer(this.space), 0, TagOfLayer.gameplay);
        this.addChild(this.gameLayer);
        this.gameLayer.addChild(new HUDLayer(), 0, TagOfLayer.hud);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed:this.onKeyDown,
            onKeyReleased:this.onKeyUp


        }, this);

        this.scheduleUpdate();
    },

    onKeyDown:function(key, event){
        var t=event.getCurrentTarget();

        switch(key) {
            case enumKeyCodes.KEY_Up:
            case enumKeyCodes.KEY_W:
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).planktonObject.movingUp = true;
                break;
            case enumKeyCodes.KEY_Down:
            case enumKeyCodes.KEY_S:
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).planktonObject.movingDown = true;
                break;
            case enumKeyCodes.KEY_Left:
            case enumKeyCodes.KEY_A:
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).planktonObject.movingLeft = true;
                break;
            case enumKeyCodes.KEY_Right:
            case enumKeyCodes.KEY_D:
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).planktonObject.movingRight = true;
                break;
            case enumKeyCodes.KEY_P:
                cc.director.pause();
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).addChild(new PauseLayer());
                //cc.director.resume();
                //cc.director.pushScene(new PauseScene()); BROKEN
                break;
        }
    },

    onKeyUp:function(key, event){
        var t=event.getCurrentTarget();
        switch(key) {

            case enumKeyCodes.KEY_Up:
            case enumKeyCodes.KEY_W:
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).planktonObject.movingUp = false;
                break;
            case enumKeyCodes.KEY_Down:
            case enumKeyCodes.KEY_S:
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).planktonObject.movingDown = false;
                break;
            case enumKeyCodes.KEY_Left:
            case enumKeyCodes.KEY_A:
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).planktonObject.movingLeft = false;
                break;
            case enumKeyCodes.KEY_Right:
            case enumKeyCodes.KEY_D:
                t.gameLayer.getChildByTag(TagOfLayer.gameplay).planktonObject.movingRight = false;
                break;
        }
    }
});