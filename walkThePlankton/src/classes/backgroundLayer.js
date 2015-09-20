/**
 * Created by Nanyou on 9/16/2015.
 */

var BackgroundLayer = cc.Layer.extend({
    map00: null,
    map01: null,
    mapWidth: 0,
    mapIndex: 0,
    objects: [],
    space: null,
    spriteSheet: null,

    ctor: function (space) {
        this._super();

        this.objects = [];
        this.space = space;

        this.init();
    },
    init: function () {
        this._super();
        /*
        //get window size
        var winSize = cc.director.getWinSize();
        //create background image and position it at center of screen
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        var spriteBG = new cc.Sprite(res.underwaterbg);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
        */

        cc.spriteFrameCache.addSpriteFrames(res.background_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.background_png);
        this.addChild(this.spriteSheet);

        //create map00
        this.map00 = new cc.TMXTiledMap(res.map00_tmx);
        this.addChild(this.map00);
        //get map width
        this.mapWidth = this.map00.getContentSize().width;
        //create map01
        this.map01 = new cc.TMXTiledMap(res.map01_tmx);
        //set position of map01 to end of map00
        this.map01.setPosition(cc.p(this.mapWidth, 0));
        this.addChild(this.map01);

        this.loadObjects(this.map00, 0);
        this.loadObjects(this.map01, 1);

        this.scheduleUpdate();
    },
    checkAndReload: function (eyeX) {
        //check if eyeX is greater than the width of the screen
        var newMapIndex = parseInt(eyeX / this.mapWidth);
        if (this.mapIndex == newMapIndex) {
            return false;
        }
        if (0 == newMapIndex % 2) {
            //change second map
            this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
        } else {
            //change first map
            this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
        }
        this.mapIndex = newMapIndex;

        return true;
    },
    update: function (dt) {
        var gameplayLayer = this.getParent().getChildByTag(TagOfLayer.gameplay);
        var eyeX = gameplayLayer.getEyeX();
        this.checkAndReload(eyeX);
    },
    loadObjects: function (map, mapIndex) {
        //add bubbles
        var bubbleGroup = map.getObjectGroup("bubble");
        var bubbleArray = bubbleGroup.getObjects();

        for (var i = 0; i < bubbleArray.length; i++) {
            var bubble = new Bubble(
                this.spriteSheet,
                this.space,
                cc.p(bubbleArray[i]["x"] + this.mapWidth * mapIndex, bubbleArray[i]["y"])
            );
            bubble.mapIndex = mapIndex;
            this.objects.push(bubble);
        }

        //add rocks
        var rockGroup = map.getObjectGroup("rock");
        var rockArray = rockGroup.getObjects();
        for (var i = 0; i < rockArray.length; i++) {
            var rock = new Rock(
                this.spriteSheet,
                this.space,
                rockArray[i]["x"] + this.mapWidth * mapIndex
            );
            rock.mapIndex = mapIndex;
            this.objects.push(rock);
        }
    },
    removeObjects: function (mapIndex) {
        while ((function (obj, index) {
            for (var i = 0; i < obj.length; i++) {
                if(obj[i].mapIndex == index) {
                    obj[i].removeFromParent();
                    obj.splice(i, 1);
                    return true;
                }
            }
            return false;
        })(this.objects, mapIndex));
    },
    removeObjectByShape: function (shape) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getShape() == shape) {
                this.objects[i].removeFromParent();
                this.objects.splice(i, 1);
                break;
            }
        }
    },
    checkAndReload: function (eyeX) {
        var newMapIndex = parseInt(eyeX / this.mapWidth);
        if (this.mapIndex == newMapIndex) {
            return false;
        }
        if (0 == newMapIndex % 2) {
            //change second map
            this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
            this.loadObjects(this.map01, newMapIndex + 1);
        } else {
            //change first map
            this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
            this.loadObjects(this.map00, newMapIndex + 1);
        }
        this.removeObjects(newMapIndex - 1);
        this.mapIndex = newMapIndex;

        return true;
    }
});