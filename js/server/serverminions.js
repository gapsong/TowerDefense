exports.minion = function(world, x, y) {
    var p2 = require('../../node_modules/p2');
    var settings = require('../settings.json');

    var tiledsize = settings.tiledsize,
        speed = settings.speed;


    this.body = new p2.Body({
        mass: 5,
        velocity: [0, 100],
        position: [x * tiledsize, y * tiledsize]
    });

    circleShape = new p2.Circle({ //circleShape refactor
        radius: tiledsize / 2
    });

    circleShape.sensor = false;
    this.body.addShape(circleShape);
    circleShape.collisionGroup = settings.MINION;
    circleShape.collisionMask = settings.BLOCK;
    world.addBody(this.body);

}
