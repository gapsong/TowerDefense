exports.richtungsblock = function(world, x, y, fieldnum) { //fieldnum ist die ID des Feldes, damit man weiß in welche richtung es geht
    var settings = require('../settings.json');
    var p2 = require('../../node_modules/p2');
    var tiledsize = settings.tiledsize;

    this.body = new p2.Body({
        position: [x * tiledsize, y * tiledsize],
        id: fieldnum
    });

    var boxShape = new p2.Box({
        width: tiledsize,
        height: tiledsize
    });
    this.body.addShape(boxShape);
    world.addBody(this.body);
}
