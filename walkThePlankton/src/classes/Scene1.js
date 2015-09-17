var Scene1Layer = cc.Layer.extend({
    ctor:function () {
        this._super();

        planktonObject = new Plankton(400,400);

        this.addChild(planktonObject);

        planktonObject.x = 400; planktonObject.y = 400;

        return true;
    },
    onKeyReleased:function (event){
        cc.director.runScene(new Scene2());

        return true;
    }
});

var Scene1 = cc.Scene.extend({
    onEnter:function () {
        this._super();

        this.addChild(new BackgroundLayer());
        this.addChild(new Scene1Layer());
    }

});