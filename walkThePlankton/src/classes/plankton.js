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
        this.distanceMoved = 0;
        this.score = 0;
        //this.moveUp = cc.moveBy(0, cc.p(0,30));

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
                t.movingUp = true;
                break;
            case enumKeyCodes.KEY_Down:
            case enumKeyCodes.KEY_S:
                t.movingDown = true;
                break;
            case enumKeyCodes.KEY_Left:
            case enumKeyCodes.KEY_A:
                t.movingLeft = true;
                break;
            case enumKeyCodes.KEY_Right:
            case enumKeyCodes.KEY_D:
                t.movingRight = true;
                break;
            case enumKeyCodes.KEY_P:
                //cc.director.pushScene(new PauseScene()); BROKEN
                break;
        }



    },

    onKeyUp:function(key, event){
        var t=event.getCurrentTarget();
        switch(key) {

            case enumKeyCodes.KEY_Up:
            case enumKeyCodes.KEY_W:
                t.movingUp = false;
                break;
            case enumKeyCodes.KEY_Down:
            case enumKeyCodes.KEY_S:
                t.movingDown = false;
                break;
            case enumKeyCodes.KEY_Left:
            case enumKeyCodes.KEY_A:
                t.movingLeft = false;
                break;
            case enumKeyCodes.KEY_Right:
            case enumKeyCodes.KEY_D:
                t.movingRight = false;
                break;
        }
    },

    update:function(dt) {
        this.move();
        this.distanceMoved+=dt * 2;
        cc.log(this.distanceMoved);
    },

    move:function(){
        var deltaX = 0; var deltaY = 0;
        if(this.movingUp){
            deltaY += 5;
        }
        if(this.movingDown){
            deltaY -= 5;
        }
        if(this.movingLeft){
            deltaX -= 5;
        }
        if(this.movingRight){
            deltaX += 5;
        }

        var move = cc.moveBy(0, cc.p(deltaX, deltaY));
        this.runAction(move);
    }





});
