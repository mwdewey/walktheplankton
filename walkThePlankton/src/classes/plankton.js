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
        this.distanceMovedAbsolute = 0;

        this.scene2Gen = false;
        this.scene3Gen = false;
        this.isCheat = false;

        this.scheduleUpdate();
    },

    update:function(dt) {
        this.checkCollectibleCollisions();
        this.move();
        this.distanceMoved+=dt*2;
        this.distanceMovedAbsolute+=currentSpeed;
        this.getParent().getParent().getChildByTag(TagOfLayer.hud).updateDistance(this.getPositionX() - 10);
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
            deltaX -= 7;
        }
        if(this.movingRight){
            deltaX += 2;
        }

        this.runAction(cc.moveBy(0, cc.p(deltaX, deltaY)));
        var temp = this.getBoundingBox();
        if(temp.x + temp.width > 1600){
            this.setPositionX(1600 - temp.width/2);
        } else if(temp.y + temp.height > 900){
            this.setPositionY(900 - temp.height/2);
        } else if(temp.y  < 0){
            this.setPositionY(temp.height/2);
        }

        if(!this.isCheat){
            this.checkObstacleCollisions();
        }


    },

    checkCollectibleCollisions:function(){
        //for(var i = 0; i < dangerObstacles.length; i++){

        //}
        for(var i = 0; i < collectibles.length; i++){
            if(cc.rectIntersectsRect(this.getBoundingBox(), collectibles[i].getBoundingBox())){
                this.getParent().getParent().getChildByTag(TagOfLayer.hud).addScore(collectibles[i].value);
                //this.score += collectibles[i].value;
                //cc.log(this.score);
                collectibles[i].removeFromParent(true);
                collectibles.splice(i, 1);
            }

        }
    },

    checkObstacleCollisions:function(){
        for(var i = 0; i < obstacles.length; i++){

            if(cc.rectIntersectsRect(this.getBoundingBox(),obstacles[i].getBoundingBox())){
                var b = obstacles[i].getBoundingBox();
                var p = this.getBoundingBox();
                var v = 10;

                if(p.y + p.height < b.y + v) this.setPositionY(b.y  - p.height + p.height/2);    //BOTTOM
                else if (p.y > b.y + b.height - v) this.setPositionY(b.y+ b.height + p.height/2); //TOP
                else if (p.x + p.width < b.x + v) this.setPositionX(b.x - p.width + p.width/2);       //LEFT
                else if (p.x > b.x + b.width - v) this.setPositionX(b.x + b.width + p.width/2); //RIGHT
                //else this.setPositionX(b.x - p.width/2);
            }
            //selse cc.log("MEEP");

        }
    },

    checkEnemyCollisions:function(){
        for(var i = 0; i < obstacles.length; i++){

            if(cc.rectIntersectsRect(this.getBoundingBox(),this.getParent().whaleSprite.getBoundingBox())){
                console.log("hit whale");
                cc.director.pause();
                this.getParent().addChild(new GameOverLayer());
            }
        }
    }

});
