/**
 * Created by Collin on 9/11/2015.
 */

var Plankton = cc.Sprite.extend({

    ctor:function(xx, yy){
        this._super(res.Plankton_png);
        this.x = xx;
        this.y = yy;
        this.movingUp = false;
        this.movingDown = false;
        this.movingLeft = false;
        this.movingRight = false;
        //this.moveUp = cc.moveBy(0, cc.p(0,30));

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed:this.onKeyDown,
            onKeyReleased:this.onKeyUp


        }, this);


    },

    onKeyDown:function(key, event){
        var t=event.getCurrentTarget();
        var deltaX = 0; var deltaY = 0;
        switch(key) {

            case enumKeyCodes.KEY_Up:
                t.movingUp = true;
                break;
            case enumKeyCodes.KEY_Down:
                t.movingDown = true;
                break;
        }
        switch(key){
            case enumKeyCodes.KEY_Left:
                t.movingLeft = true;
                break;
            case enumKeyCodes.KEY_Right:
                t.movingRight = true;
                break;
        }

        if(t.movingUp){
            deltaY += 5;
        }
        if(t.movingDown){
            deltaY -= 5;
        }
        if(t.movingLeft){
            deltaX -= 5;
        }
        if(t.movingRight){
            deltaX += 5;
        }

        var move = cc.moveBy(0, cc.p(deltaX, deltaY));
        t.runAction(move);

    },

    onKeyUp:function(key, event){
        var t=event.getCurrentTarget();
        switch(key) {

            case enumKeyCodes.KEY_Up:
                t.movingUp = false;
                break;
            case enumKeyCodes.KEY_Down:
                t.movingDown = false;
                break;
        }
        switch(key){
            case enumKeyCodes.KEY_Left:
                t.movingLeft = false;
                break;
            case enumKeyCodes.KEY_Right:
                t.movingRight = false;
                break;
        }
    },

    update:function(dt) {

    }





});
