/**
 * Created by Nanyou on 9/18/2015.
 */

var g_groundHeight = 57;
var g_startX = 80;

if(typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.gameplay = 1;
    TagOfLayer.overlay = 2;
};

//collision objects
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.plankton = 0;
    SpriteTag.rock = 1;
    SpriteTag.bubble = 2;
}