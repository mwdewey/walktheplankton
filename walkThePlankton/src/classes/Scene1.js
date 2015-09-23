var Scene1Layer = cc.Layer.extend({



    onEnter:function () {
        this._super();
        cc.log("story create");
        var story = new cc.Sprite();
        var s1 = new cc.SpriteFrame(res.op1_png, cc.rect(0,0,1600,900));
        var s2 = new cc.SpriteFrame(res.op2_png, cc.rect(0,0,1600,900));
        var s3 = new cc.SpriteFrame(res.op3_png, cc.rect(0,0,1600,900));

        story.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
        var animation = new cc.Animation([s1,s2,s3], 5, 1);
        var animate = new cc.Animate(animation);
        //story.runAction(new cc.Animate(animation));
        this.addChild(story);

        var callbackRotate = new cc.CallFunc(function(){
            cc.director.runScene(new Manager());
        });

        var seq = new cc.Sequence(animate,callbackRotate);
        story.runAction(seq);


    },

    init: function () {

    },

    update: function(dt){

    }
});


var Scene1 = cc.Scene.extend({
    onEnter:function () {
        this._super();


        this.addChild(new Scene1Layer());
    }

});