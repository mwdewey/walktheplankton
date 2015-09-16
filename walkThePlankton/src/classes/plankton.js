/**
 * Created by Collin on 9/11/2015.
 */

var Plankton = cc.Sprite.extend({

    ctor:function(xx, yy){
        this._super(res.Plankton_png);
        this.x = xx;
        this.y = yy;
        //this.moveUp = cc.moveBy(0, cc.p(0,30));

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed:this.onKeyDown



        }, this);


    },

    onKeyDown:function(key, event){
        var t=event.getCurrentTarget();
        switch(key) {
            case enumKeyCodes.KEY_Left:
                var moveUp = cc.moveBy(0, cc.p(-5,0));
                t.runAction (moveUp);
                break;
            case enumKeyCodes.KEY_Right:
                var moveUp = cc.moveBy(0, cc.p(5,0));
                t.runAction (moveUp);
                break;
            case enumKeyCodes.KEY_Up:
                var moveUp = cc.moveBy(0, cc.p(0,5));
                t.runAction (moveUp);
                break;
            case enumKeyCodes.KEY_Down:
                var moveUp = cc.moveBy(0, cc.p(0,-5));
                t.runAction (moveUp);
                break;
        }
    }





});
