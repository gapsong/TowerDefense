exports.minion = function(world, x, y) {
    var p2 = require('../../node_modules/p2');
    var settings = require('../settings.json');
    var preload = require('./serverpreload');
    preload.preload1();

    this.body = new p2.Body({
        mass: 5,
        velocity: [0, 100],
        position: [x * TILEDSIZE, y * TILEDSIZE]
    });

    circleShape = new p2.Circle({ //circleShape refactor
        radius: TILEDSIZE / 2
    });

    circleShape.sensor = false;
    this.body.addShape(circleShape);
    circleShape.collisionGroup = MINION;
    circleShape.collisionMask = BLOCK;
    world.addBody(this.body);

}
