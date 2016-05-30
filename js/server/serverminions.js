exports.minion = function(world, x, y) {
    var p2 = require('../../node_modules/p2');
    var settings = require('../settings.json');

    var tiledsize = settings.tiledsize;
    var speed = settings.speed;

    this.body = new p2.Body({
        mass: 5,
        velocity: [0, 0],
        position: [x * tiledsize, y * tiledsize],
        damping: 0
    });
    this.richtung = smap[x][y];
    circleShape = new p2.Circle({
        radius: 10
    });
    circleShape.sensor = false;
    this.body.addShape(circleShape);
    world.addBody(this.body);

    this.doit2 = function(){

    }

    this.doit = function() {
        this.changedir();
        this.move();
    }

    this.changedir = function() {
        var tempX = ~~((this.body.position[0] + tiledsize / 2) / tiledsize); //das ist die x position
        var tempY = ~~((this.body.position[1] + tiledsize / 2) / tiledsize); //das ist die y position
        this.richtung = smap[tempX][tempY];
        console.log("tempX: " + tempX + " tempY: " + tempY + " richtung: " + this.richtung);
    }

    this.move = function() {
        switch (this.richtung) {
            case 15:
                this.body.velocity[0] = speed;
                this.body.velocity[1] = 0;
                break;
            case 14:
                this.body.velocity[0] = 0;
                this.body.velocity[1] = speed;
                break;
            case 4:
                this.body.velocity[0] = 0;
                this.body.velocity[1] = -speed;
                break;
            case 3:
                this.body.velocity[0] = -speed;
                this.body.velocity[1] = 0;
                break;
        }
    }
}
