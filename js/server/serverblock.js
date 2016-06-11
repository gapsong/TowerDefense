exports.richtungsblock = function(world, x, y, fieldnum) { //fieldnum ist die ID des Feldes, damit man weiß in welche richtung es geht
    var p2 = require('../../node_modules/p2');
    var preload = require('./serverpreload');
    preload.preload1();

    this.body = new p2.Body({
        position: [x * TILEDSIZE, y * TILEDSIZE],
        id: fieldnum
    });

    var boxShape = new p2.Box({
        width: TILEDSIZE,
        height: TILEDSIZE
    });

    this.body.addShape(boxShape);
    boxShape.collisionGroup = BLOCK;
    boxShape.collisionMask = MINION;
    world.addBody(this.body);
}
