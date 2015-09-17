var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Plankton_png : "res/planktonTester.png",
    startButtonNormal : "res/start_n.png",
    startButtonSelect : "res/start_s.png",
    underwaterbg : "res/Background/underwater.png",
    plankton : "res/Sprites/plankton.png",
    whale_png : "res/Sprites/munch.png",
    whale_plist : "res/Sprites/munch.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}