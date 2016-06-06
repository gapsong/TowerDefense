exports.minion = function(world, x, y) {
    var p2 = require('../../node_modules/p2');
    var settings = require('../settings.json');

    var tiledsize = settings.tiledsize;
    var speed = settings.speed;

    this.body = new p2.Body({
        mass: 5,
        velocity: [0, 100],
        position: [x * tiledsize, y * tiledsize]
    });
    circleShape = new p2.Circle({ //circleShape refactor
        radius: tiledsize / 2
    });
    circleShape.sensor = true;
    this.body.addShape(circleShape);
    world.addBody(this.body);

    this.move2 = function(richtung) {
        switch (richtung) {
            case 17: //rechts
                this.body.velocity = [speed, 0];
                break;
            case 16: //runter
                this.body.velocity = [0, speed];
                break;
            case 6: //hoch
                this.body.velocity = [0, -speed];
                break;
            case 5: //links
                this.body.velocity = [-speed, 0];
        }
    }
}
