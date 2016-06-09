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

    this.move2 = function(richtung) {
        this.body.position = [
            Math.round(this.body.position[0] / tiledsize) * tiledsize,
            Math.round(this.body.position[1] / tiledsize) * tiledsize
        ]; //diese Methode packt minion nochmal auf die bahn
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
