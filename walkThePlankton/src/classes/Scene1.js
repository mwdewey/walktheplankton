var Scene1Layer = cc.Layer.extend({
    ctor:function () {
        this._super();

        this.plankton = new Plankton(400,400);
        this.addChild(this.plankton);

        this.plankton.x = 400; this.plankton.y = 400;

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