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
        this.checkCollectibleCollisions();
        this.move();
        this.distanceMoved+=dt * 2;
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


        this.checkObstacleCollisions();
        this.runAction(cc.moveBy(0, cc.p(deltaX, deltaY)));
    },

    checkCollectibleCollisions:function(){
        //for(var i = 0; i < dangerObstacles.length; i++){

        //}
        for(var i = 0; i < collectibles.length; i++){
            if(cc.rectIntersectsRect(planktonObject.getBoundingBox(), collectibles[i].getBoundingBox())){
                this.score += collectibles[i].value;
                cc.log(this.score);
                collectibles[i].removeFromParent(true);
                collectibles.splice(i, 1);
            }

        }
    },

    checkObstacleCollisions:function(){
        for(var i = 0; i < obstacles.length; i++){

            if(cc.rectIntersectsRect(planktonObject.getBoundingBox(),obstacles[i].getBoundingBox())){
                var b = obstacles[i].getBoundingBox();
                var p = planktonObject.getBoundingBox();
                var v = 5;

                if(p.y < b.y - b.height/2 - v) this.setPositionY(b.y  - p.height/2 - v)    //BOTTOM
                else if (p.y > b.y + b.height/2 + v) this.setPositionY(b.y+ b.height + p.height/2 + v); //TOP
                else if (p.x < b.x - b.width/2 - v) this.setPositionX(b.x - p.width/2 - v);       //LEFT
                else if (p.x > b.x + b.width/2 + v) this.setPosition(b.x + b.width + p.width/2 + v); //RIGHT

            }
            else cc.log("MEEP");

        }
    }





});
