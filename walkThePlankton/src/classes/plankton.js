/**
 * Created by Collin on 9/11/2015.
 */

var Plankton = cc.Sprite.extend({
    ctor:function(){
        this._super(res.Plankton_png);

        var moving = cc.moveBy(1, cc.p(80,80));

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(key, event) {
                switch(key) {
                    case enumKeyCodes.KEY_Left:
                        self.isSwipeLeft = true;
                        break;
                    case enumKeyCodes.KEY_Right:
                        self.isSwipeRight = true;
                        break;
                    case enumKeyCodes.KEY_Up:
                        this.Plankton.runAction(moving);
                        break;
                    case enumKeyCodes.KEY_Down:
                        self.isSwipeDown = true;
                        break;
                }
            },
            onKeyReleased:function(key, event) {
                switch(key) {
                    case enumKeyCodes.Key_Left:
                        self.isSwipeLeft = false;
                        break;
                    case enumKeyCodes.Key_Right:
                        self.isSwipeRight = false;
                        break;
                    case enumKeyCodes.Key_Up:
                        self.isSwipeUp = false;
                        break;
                    case enumKeyCodes.Key_Down:
                        self.isSwipeDown = false;
                        break;
                }
            }
        }, this);


    }





});
